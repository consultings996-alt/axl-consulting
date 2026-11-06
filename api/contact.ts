/**
 * Función de Vercel: recibe el formulario de contacto y lo reenvía por correo.
 *
 * Variables de entorno (Vercel → Project → Settings → Environment Variables):
 *   GMAIL_USER          Cuenta de Gmail que envía el correo (ej. consultings996@gmail.com)
 *   GMAIL_APP_PASSWORD  Contraseña de aplicación de Google (NO la contraseña normal)
 *   CONTACT_TO          (opcional) Destinatario. Por defecto, GMAIL_USER
 */
import { parseContactBody, validateContactPayload } from '../src/data/contactContract.ts'
import { buildContactEmail } from './_lib/emailTemplate.ts'
import { getMailTransporter } from './_lib/mailer.ts'
import { isRateLimited, validateRequestSecurity, type VercelRequest, type VercelResponse } from './_lib/security.ts'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Método no permitido.' })
  }

  const securityError = validateRequestSecurity(req)
  if (securityError) {
    return res.status(securityError.status).json({ ok: false, error: securityError.error })
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ ok: false, error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' })
  }

  const payload = parseContactBody(req.body)
  if (!payload) return res.status(400).json({ ok: false, error: 'Solicitud inválida.' })

  // Campo trampa lleno = bot. Se responde "ok" para no darle pistas.
  if (payload._gotcha) return res.status(200).json({ ok: true })

  const validationError = validateContactPayload(payload)
  if (validationError) return res.status(400).json({ ok: false, error: validationError })

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    console.error('Faltan GMAIL_USER o GMAIL_APP_PASSWORD en las variables de entorno.')
    return res.status(500).json({ ok: false, error: 'El servicio de correo no está configurado.' })
  }

  const transporter = getMailTransporter(user, pass)
  const mail = buildContactEmail(payload, user, process.env.CONTACT_TO)

  try {
    await transporter.sendMail(mail)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error al enviar el correo de contacto:', err)
    return res.status(502).json({ ok: false, error: 'No se pudo enviar el mensaje.' })
  }
}
