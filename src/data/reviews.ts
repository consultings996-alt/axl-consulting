import rawReviews from './reviews.json'
import { serviceBySlug, type Service } from './services'

export interface ReviewItem {
  id: number
  /** Razón principal por la que el cliente buscó a A.X.L */
  whyHired: string
  /** Reseña sobre la experiencia y ejecución */
  quote: string
  /** Resultado tangible o métrica de impacto */
  outcome: string
  /** Cargo del decisor */
  role: string
  /** Giro y ubicación */
  industry: string
  /** Slug del servicio vinculado (data/services.ts) */
  serviceSlug: string
}

export interface EnrichedReview extends ReviewItem {
  service: Service
}

export const reviews: EnrichedReview[] = (rawReviews as ReviewItem[]).map((item) => ({
  ...item,
  service: serviceBySlug(item.serviceSlug) ?? serviceBySlug('software-a-medida')!
}))

/**
 * Baraja un arreglo con el algoritmo Fisher–Yates sin mutar el original.
 * Si se pasa `excludeFirstIds`, asegura que los primeros elementos del nuevo
 * mazo no coincidan con los recién mostrados en pantalla.
 */
export function shuffleReviews(
  source: EnrichedReview[] = reviews,
  excludeFirstIds: Set<number> = new Set(),
  batchSize = 3
): EnrichedReview[] {
  const copy = [...source]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = temp
  }

  if (excludeFirstIds.size > 0 && copy.length > batchSize * 2) {
    const nonOverlapping = copy.filter((r) => !excludeFirstIds.has(r.id))
    const overlapping = copy.filter((r) => excludeFirstIds.has(r.id))
    return [...nonOverlapping, ...overlapping]
  }

  return copy
}

