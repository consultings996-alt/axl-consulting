import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONTACT_LIMITS,
  isValidEmail,
  oneLine,
  parseContactBody,
  validateContactPayload
} from '../src/data/contactContract.ts'
import { buildContactEmail, escapeHtml } from '../api/_lib/emailTemplate.ts'
import {
  isRateLimited,
  MAX_BODY_BYTES,
  RATE_MAX_REQUESTS,
  RATE_WINDOW_MS,
  resetRateLimiter,
  validateRequestSecurity
} from '../api/_lib/security.ts'
import handler from '../api/contact.ts'

test('parseContactBody y validateContactPayload aceptan una solicitud válida', () => {
  const payload = parseContactBody({
    name: '  Ana Pérez ',
    email: 'ana.perez@empresa.mx ',
    company: 'Empresa SA',
    phone: '+52 55 1234 5678',
    service: 'Software a medida',
    timeline: 'En 1 a 3 meses',
    budget: '$50,000 a $150,000 MXN',
    subject: '',
    message: 'Necesitamos automatizar facturación.',
    _gotcha: ''
  })

  assert.ok(payload)
  assert.equal(payload.name, 'Ana Pérez')
  assert.equal(payload.email, 'ana.perez@empresa.mx')
  assert.equal(validateContactPayload(payload), null)
})

test('isValidEmail rechaza vectores de inyección RFC 5322 (SEC-01)', () => {
  assert.equal(isValidEmail('cliente@dominio.com'), true)
  assert.equal(isValidEmail('victim@example.com,attacker@evil.com'), false)
  assert.equal(isValidEmail('victim@example.com;attacker@evil.com'), false)
  assert.equal(isValidEmail('"quoted"@example.com'), false)
  assert.equal(isValidEmail('user(comment)@example.com'), false)
  assert.equal(isValidEmail('<user@example.com>'), false)
  assert.equal(isValidEmail('user@example.com\r\nBcc:evil@evil.com'), false)
})

test('validateContactPayload reporta errores legibles en español cuando se excede longitud', () => {
  const payload = parseContactBody({
    name: 'A'.repeat(CONTACT_LIMITS.name + 1),
    email: 'ana@empresa.mx',
    service: 'Software a medida'
  })
  assert.ok(payload)
  const error = validateContactPayload(payload)
  assert.match(error ?? '', /El campo nombre excede el límite de 100 caracteres\./)
})

test('oneLine y buildContactEmail eliminan caracteres de control y escapan HTML (SEC-01)', () => {
  assert.equal(oneLine('Hola\r\nBcc: evil@evil.com\x00\x1f\x7fMundo'), 'Hola Bcc: evil@evil.com Mundo')
  assert.equal(escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')

  const payload = parseContactBody({
    name: 'Juan\r\nBcc:otro@sitio.com',
    email: 'juan@empresa.mx',
    company: '<img src=x onerror=alert(1)>',
    service: 'Integraciones y APIs',
    message: 'Hola <b>mundo</b>'
  })
  assert.ok(payload)

  const mail = buildContactEmail(payload, 'consultings996@gmail.com')
  assert.equal(mail.replyTo.name, 'Juan Bcc:otro@sitio.com')
  assert.ok(!mail.subject.includes('\r') && !mail.subject.includes('\n'))
  assert.ok(mail.html.includes('&lt;img src=x onerror=alert(1)&gt;'))
  assert.ok(mail.html.includes('Hola &lt;b&gt;mundo&lt;/b&gt;'))
})

test('validateRequestSecurity bloquea payloads gigantes, Content-Type inválido y orígenes cruzados (SEC-04)', () => {
  assert.equal(
    validateRequestSecurity({
      headers: {
        'content-length': String(MAX_BODY_BYTES + 1),
        'content-type': 'application/json'
      }
    })?.status,
    413
  )

  assert.equal(
    validateRequestSecurity({
      headers: {
        'content-type': 'text/plain'
      }
    })?.status,
    415
  )

  assert.equal(
    validateRequestSecurity({
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'cross-site'
      }
    })?.status,
    403
  )

  assert.equal(
    validateRequestSecurity({
      headers: {
        'content-type': 'application/json',
        origin: 'https://sitio-atacante.com',
        host: 'axl-consulting.vercel.app'
      }
    })?.status,
    403
  )

  assert.equal(
    validateRequestSecurity({
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'same-origin',
        origin: 'https://axl-consulting.vercel.app',
        host: 'axl-consulting.vercel.app'
      }
    }),
    null
  )
})

test('isRateLimited aplica límite por IP y libera tras expirar la ventana (SEC-02)', () => {
  resetRateLimiter()
  const req = {
    headers: { 'x-forwarded-for': '203.0.113.42, 10.0.0.1' },
    socket: {}
  }
  const start = 1_700_000_000_000

  for (let i = 0; i < RATE_MAX_REQUESTS; i++) {
    assert.equal(isRateLimited(req, start + i * 100), false)
  }
  assert.equal(isRateLimited(req, start + 1000), true)

  // Después de expirar la ventana de 10 minutos, vuelve a permitir
  assert.equal(isRateLimited(req, start + RATE_WINDOW_MS + 1), false)
  resetRateLimiter()
})

test('handler responde 405 en GET y 200 silencioso cuando se activa el honeypot _gotcha', async () => {
  resetRateLimiter()
  const createRes = () => {
    const res = {
      statusCode: 200,
      headers: {},
      body: null,
      setHeader(k, v) {
        this.headers[k] = v
      },
      status(code) {
        this.statusCode = code
        return this
      },
      json(payload) {
        this.body = payload
      }
    }
    return res
  }

  const getRes = createRes()
  await handler({ method: 'GET', headers: {} }, getRes)
  assert.equal(getRes.statusCode, 405)

  const botRes = createRes()
  await handler(
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.7' },
      body: { name: 'Bot', email: 'bot@spam.com', service: 'Software', _gotcha: 'spambot' }
    },
    botRes
  )
  assert.equal(botRes.statusCode, 200)
  assert.deepEqual(botRes.body, { ok: true })
  resetRateLimiter()
})

