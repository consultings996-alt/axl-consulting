/**
 * Transporte SMTP singleton con timeouts explícitos para entornos Serverless.
 */
import nodemailer, { type Transporter } from 'nodemailer'

let cachedTransporter: Transporter | null = null
let cachedUser = ''

export function getMailTransporter(user: string, pass: string): Transporter {
  if (!cachedTransporter || cachedUser !== user) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000
    })
    cachedUser = user
  }
  return cachedTransporter
}

