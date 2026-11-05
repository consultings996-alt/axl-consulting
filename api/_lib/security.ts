/**
 * Controles de seguridad HTTP y limitación de tasa (Rate-Limiting) para `/api/contact`.
 */
import type { IncomingMessage, ServerResponse } from 'node:http'

export type VercelRequest = IncomingMessage & { body?: unknown }
export type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse
  json: (body: unknown) => void
}

export const MAX_BODY_BYTES = 16_384 // 16 KB
export const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutos
export const RATE_MAX_REQUESTS = 5
const MAX_TRACKED_IPS = 1000

const rateMap = new Map<string, { count: number; resetAt: number }>()

export function getClientIp(req: Pick<VercelRequest, 'headers' | 'socket'>): string {
  const xff = req.headers['x-forwarded-for']
  const firstIp = (Array.isArray(xff) ? xff[0] : xff?.split(',')[0])?.trim()
  return firstIp || req.socket?.remoteAddress || 'unknown'
}

export function isRateLimited(req: Pick<VercelRequest, 'headers' | 'socket'>, now = Date.now()): boolean {
  const ip = getClientIp(req)

  if (rateMap.size >= MAX_TRACKED_IPS) {
    for (const [key, entry] of rateMap) {
      if (entry.resetAt <= now) rateMap.delete(key)
    }
    if (rateMap.size >= MAX_TRACKED_IPS) {
      const oldestKey = rateMap.keys().next().value
      if (oldestKey) rateMap.delete(oldestKey)
    }
  }

  const entry = rateMap.get(ip)
  if (!entry || entry.resetAt <= now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_MAX_REQUESTS
}

export function resetRateLimiter(): void {
  rateMap.clear()
}

export function validateRequestSecurity(
  req: Pick<VercelRequest, 'headers'>
): { status: number; error: string } | null {
  const contentLength = Number(req.headers['content-length'] || 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return { status: 413, error: 'Solicitud demasiado grande.' }
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase()
  if (!contentType.includes('application/json')) {
    return { status: 415, error: 'Formato no soportado.' }
  }

  const secFetchSite = req.headers['sec-fetch-site']
  if (
    typeof secFetchSite === 'string' &&
    secFetchSite !== 'same-origin' &&
    secFetchSite !== 'same-site' &&
    secFetchSite !== 'none'
  ) {
    return { status: 403, error: 'Origen no permitido.' }
  }

  const origin = req.headers.origin
  const host = req.headers.host
  if (typeof origin === 'string' && typeof host === 'string') {
    try {
      if (new URL(origin).host !== host) {
        return { status: 403, error: 'Origen no permitido.' }
      }
    } catch {
      return { status: 403, error: 'Origen no permitido.' }
    }
  }

  return null
}

