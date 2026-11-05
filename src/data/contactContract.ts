/**
 * Contrato compartido entre el formulario de cotización (Frontend) y `/api/contact` (Backend).
 * Libre de dependencias de Node o DOM para poder importarse en ambos entornos.
 */

export interface ContactPayload {
  name: string
  email: string
  company: string
  phone: string
  service: string
  timeline: string
  budget: string
  subject: string
  message: string
  _gotcha: string
}

export type ContactResponse = { ok: true } | { ok: false; error: string }

export const CONTACT_LIMITS: Record<Exclude<keyof ContactPayload, '_gotcha'>, number> = {
  name: 100,
  email: 254,
  company: 120,
  phone: 40,
  service: 80,
  timeline: 60,
  budget: 60,
  subject: 150,
  message: 5000
}

export const FIELD_LABELS: Record<Exclude<keyof ContactPayload, '_gotcha'>, string> = {
  name: 'nombre',
  email: 'correo',
  company: 'empresa',
  phone: 'teléfono',
  service: 'servicio',
  timeline: 'inicio deseado',
  budget: 'presupuesto',
  subject: 'asunto',
  message: 'mensaje'
}

/**
 * Expresión regular estricta para correo electrónico (sin caracteres de agrupación/inyección
 * RFC 5322 como comas, punto y coma, comillas o paréntesis).
 */
export const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Elimina saltos de línea y caracteres de control ASCII para evitar inyección en cabeceras SMTP */
export const oneLine = (s: string): string => s.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim()

export const isValidEmail = (email: string): boolean =>
  Boolean(email) && email.length <= CONTACT_LIMITS.email && EMAIL_RE.test(email)

function safeJson(raw: string): unknown {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function parseContactBody(body: unknown): ContactPayload | null {
  const data = typeof body === 'string' ? safeJson(body) : body
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null
  const d = data as Record<string, unknown>
  const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  return {
    name: text(d.name),
    email: text(d.email),
    company: text(d.company),
    phone: text(d.phone),
    service: text(d.service),
    timeline: text(d.timeline),
    budget: text(d.budget),
    subject: text(d.subject),
    message: text(d.message),
    _gotcha: text(d._gotcha)
  }
}

export function validateContactPayload(p: ContactPayload): string | null {
  if (!p.name || !p.email) return 'El nombre y el correo son obligatorios.'
  if (!p.service && !p.message) return 'Indica el servicio que te interesa o escribe un mensaje.'
  if (!isValidEmail(p.email)) return 'El correo no es válido.'
  for (const key of Object.keys(CONTACT_LIMITS) as (keyof typeof CONTACT_LIMITS)[]) {
    if (p[key].length > CONTACT_LIMITS[key]) {
      return `El campo ${FIELD_LABELS[key]} excede el límite de ${CONTACT_LIMITS[key]} caracteres.`
    }
  }
  return null
}

