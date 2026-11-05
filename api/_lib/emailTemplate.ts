/**
 * Construcción y sanitización de la plantilla de correo de contacto.
 */
import { type ContactPayload, oneLine } from '../../src/data/contactContract.ts'

export const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export interface ContactMailMessage {
  from: string
  to: string
  replyTo: { name: string; address: string }
  subject: string
  text: string
  html: string
}

export function buildContactEmail(
  payload: ContactPayload,
  senderUser: string,
  recipientTo?: string
): ContactMailMessage {
  const cleanName = oneLine(payload.name)
  const cleanEmail = oneLine(payload.email)
  const rawSubject = payload.subject || `Cotización: ${payload.service || 'consulta general'}`

  // Solo se incluyen los campos que el visitante llenó
  const fields: [string, string][] = (
    [
      ['Nombre', cleanName],
      ['Correo', cleanEmail],
      ['Empresa', payload.company],
      ['Teléfono / WhatsApp', payload.phone],
      ['Servicio', payload.service],
      ['Inicio deseado', payload.timeline],
      ['Presupuesto', payload.budget]
    ] as [string, string][]
  )
    .filter(([, value]) => value)
    .map(([label, value]) => [label, oneLine(value)] as [string, string])

  const message = payload.message || '(Sin mensaje adicional)'

  return {
    from: `"Sitio web A.X.L" <${oneLine(senderUser)}>`,
    to: oneLine(recipientTo || senderUser),
    replyTo: { name: cleanName, address: cleanEmail },
    subject: `[Sitio web] ${oneLine(rawSubject)}`,
    text: `${fields.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`,
    html: `
        <h2>Nueva solicitud desde el sitio web</h2>
        <table cellpadding="6" style="border-collapse: collapse">
          ${fields
            .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
            .join('')}
        </table>
        <hr>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `
  }
}

