<template>
  <section class="reviews" aria-labelledby="reviews-title">
    <div class="container">
      <header class="head">
        <div class="head-copy">
          <p class="kicker">Experiencia comprobada · {{ totalCount }} casos reales</p>
          <h2 id="reviews-title">¿Por qué nos contrataron?</h2>
          <p class="sub">
            Cada cliente llegó con una urgencia operativa o técnica concreta. Explora al azar qué los llevó a elegirnos y el impacto que lograron.
          </p>
        </div>

        <div class="controls">
          <div class="deck-status" aria-live="polite">
            <span class="status-label">
              Exploradas <strong>{{ seenCount }}</strong> de <strong>{{ totalCount }}</strong> reseñas sin repetir
            </span>
            <div class="progress-track" role="progressbar" :aria-valuenow="seenCount" :aria-valuemin="batchSize" :aria-valuemax="totalCount">
              <div class="progress-fill" :style="{ width: `${progressPercent}%` }" />
            </div>
          </div>

          <button
            type="button"
            class="shuffle-btn"
            :class="{ 'is-spinning': isSpinning }"
            @click="nextBatch"
          >
            <svg class="shuffle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
            <span>Mostrar otras 3 razones</span>
          </button>
        </div>
      </header>

      <TransitionGroup name="review-swap" tag="ul" class="grid" aria-live="polite">
        <li v-for="(item, index) in currentBatch" :key="item.id" class="grid-item">
          <article class="card">
            <div class="card-top">
              <span class="service-tag">
                <ServiceIcon :name="item.service.icon" class="service-icon" />
                {{ item.service.shortTitle }}
              </span>

              <button
                type="button"
                class="swap-one"
                :title="'Cambiar esta reseña por otra al azar'"
                :aria-label="`Cambiar reseña de ${item.role} por otra diferente`"
                @click="replaceSingleCard(index)"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M16 3h-4m4 0v4m0-4-5 5M4 17h4m-4 0v-4m0 4 5-5" />
                </svg>
                <span>Otra</span>
              </button>
            </div>

            <div class="why-box">
              <span class="why-label">Por qué nos buscaron</span>
              <p class="why-text">“{{ item.whyHired }}”</p>
            </div>

            <blockquote class="quote">
              <p>{{ item.quote }}</p>
            </blockquote>

            <div class="outcome">
              <svg class="outcome-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16.5 5.5 8.25 13.75 3.5 9" />
              </svg>
              <span>{{ item.outcome }}</span>
            </div>

            <footer class="card-foot">
              <div class="author">
                <strong>{{ item.role }}</strong>
                <span>{{ item.industry }}</span>
              </div>

              <router-link :to="quoteLink(item.service.slug)" class="card-cta">
                <span>Tengo un reto similar</span>
                <span class="arrow" aria-hidden="true">→</span>
              </router-link>
            </footer>
          </article>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { reviews, shuffleReviews, type EnrichedReview } from '@/data/reviews'
import { quoteLink } from '@/data/pages'
import ServiceIcon from '@/components/ServiceIcon.vue'

const batchSize = 3
const totalCount = reviews.length

// Estado determinista inicial para SSR y prerenderizado limpio
const deck = ref<EnrichedReview[]>([...reviews])
const currentBatch = ref<EnrichedReview[]>(reviews.slice(0, batchSize))
const cursor = ref<number>(batchSize)
const seenIds = ref<Set<number>>(new Set(reviews.slice(0, batchSize).map((r) => r.id)))
const isSpinning = ref(false)

const seenCount = computed(() => seenIds.value.size)
const progressPercent = computed(() => Math.round((seenCount.value / totalCount) * 100))

function triggerSpin() {
  isSpinning.value = true
  setTimeout(() => {
    isSpinning.value = false
  }, 380)
}

/**
 * Extrae el siguiente elemento del mazo barajado garantizando que:
 * 1. Nunca esté duplicado entre las tarjetas visibles actualmente.
 * 2. No se repita ninguna reseña hasta haber recorrido las 20 completas.
 */
function drawNextUnique(currentlyVisibleIds: Set<number>): EnrichedReview {
  // Buscar en lo que resta del mazo actual un ítem que no esté en pantalla
  while (cursor.value < deck.value.length) {
    const candidate = deck.value[cursor.value]!
    cursor.value += 1
    if (!currentlyVisibleIds.has(candidate.id)) {
      return candidate
    }
  }

  // Si se agotó el mazo de 20, re-barajar excluyendo las visibles actuales al inicio
  deck.value = shuffleReviews(reviews, currentlyVisibleIds, batchSize)
  cursor.value = 0
  seenIds.value = new Set(currentlyVisibleIds)

  const next = deck.value[cursor.value]!
  cursor.value += 1
  return next
}

/** Muestra un nuevo lote de 3 reseñas totalmente distintas */
function nextBatch() {
  triggerSpin()

  // Si ya se recorrieron las 20 reseñas, reiniciamos el contador para iniciar nuevo ciclo
  if (seenIds.value.size >= totalCount) {
    const currentVisible = new Set(currentBatch.value.map((r) => r.id))
    deck.value = shuffleReviews(reviews, currentVisible, batchSize)
    cursor.value = 0
    seenIds.value = new Set()
  }

  const avoidIds = new Set(currentBatch.value.map((r) => r.id))
  const nextItems: EnrichedReview[] = []

  for (let i = 0; i < batchSize; i++) {
    const picked = drawNextUnique(avoidIds)
    nextItems.push(picked)
    avoidIds.add(picked.id)
    seenIds.value.add(picked.id)
  }

  currentBatch.value = nextItems
}

/** Permite cambiar una sola tarjeta de lugar sin alterar las otras dos */
function replaceSingleCard(index: number) {
  const avoidIds = new Set(currentBatch.value.map((r) => r.id))

  if (seenIds.value.size >= totalCount) {
    deck.value = shuffleReviews(reviews, avoidIds, batchSize)
    cursor.value = 0
    seenIds.value = new Set(avoidIds)
  }

  const replacement = drawNextUnique(avoidIds)
  seenIds.value.add(replacement.id)

  const updated = [...currentBatch.value]
  updated[index] = replacement
  currentBatch.value = updated
}

onMounted(() => {
  // Barajado inicial al montar en el cliente para que cada visita sea única
  const shuffled = shuffleReviews(reviews)
  deck.value = shuffled
  currentBatch.value = shuffled.slice(0, batchSize)
  cursor.value = batchSize
  seenIds.value = new Set(currentBatch.value.map((r) => r.id))
})
</script>

<style scoped>
.reviews {
  background: var(--paper);
  padding: var(--section-space) 0;
  border-top: 1px solid var(--line);
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px 40px;
  margin-bottom: clamp(36px, 5vw, 56px);
}

.head-copy {
  max-width: 620px;
}

.kicker {
  margin: 0 0 12px;
  color: var(--signal);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.01em;
}

h2 {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.sub {
  margin: 16px 0 0;
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.6;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.deck-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.status-label {
  font-size: var(--text-sm);
  color: var(--muted);
}

.status-label strong {
  color: var(--ink);
  font-weight: 600;
}

.progress-track {
  width: 220px;
  height: 5px;
  background: var(--line);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--signal);
  border-radius: var(--radius-pill);
  transition: width 0.35s ease;
}

.shuffle-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 22px;
  border-radius: var(--radius-md);
  border: 1px solid var(--signal);
  background: #ffffff;
  color: var(--signal);
  font-family: var(--font-body);
  font-size: 0.96875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px -12px rgba(11, 101, 163, 0.45);
  transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.shuffle-btn:hover {
  background: var(--signal);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -12px rgba(11, 101, 163, 0.55);
}

.shuffle-btn:active {
  transform: translateY(0);
}

.shuffle-icon {
  width: 19px;
  height: 19px;
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}

.shuffle-btn.is-spinning .shuffle-icon {
  transform: rotate(180deg) scale(1.08);
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.grid-item {
  display: flex;
}

.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 28px;
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 32px -24px rgba(10, 26, 47, 0.16);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--signal);
  box-shadow: 0 18px 36px -22px rgba(11, 101, 163, 0.32);
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
}

.service-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px;
  border-radius: var(--radius-pill);
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8125rem;
  font-weight: 600;
}

.service-icon {
  width: 16px;
  height: 16px;
  color: var(--signal);
  flex-shrink: 0;
}

.swap-one {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.swap-one svg {
  width: 14px;
  height: 14px;
}

.swap-one:hover {
  color: var(--signal);
  background: var(--paper);
  border-color: var(--line);
}

.why-box {
  padding: 14px 16px;
  border-left: 3px solid var(--signal);
  background: var(--paper);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: 18px;
}

.why-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--signal);
  margin-bottom: 6px;
}

.why-text {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.42;
  color: var(--ink);
}

.quote {
  margin: 0 0 20px;
  padding: 0;
  border: 0;
}

.quote p {
  margin: 0;
  color: var(--muted);
  font-size: 0.96875rem;
  line-height: 1.62;
}

.outcome {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  background: rgba(11, 101, 163, 0.06);
  border: 1px solid rgba(11, 101, 163, 0.18);
  color: var(--ink);
  font-size: 0.84rem;
  font-weight: 600;
}

.outcome-icon {
  width: 16px;
  height: 16px;
  color: var(--signal);
  flex-shrink: 0;
}

.card-foot {
  padding-top: 16px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author strong {
  font-size: 0.92rem;
  color: var(--ink);
  font-weight: 600;
}

.author span {
  font-size: 0.82rem;
  color: var(--muted);
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--signal);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
}

.card-cta .arrow {
  transition: transform 0.2s ease;
}

.card-cta:hover .arrow {
  transform: translateX(4px);
}

/* Transición al rotar reseñas */
.review-swap-enter-active,
.review-swap-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.review-swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.review-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .controls,
  .deck-status {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card:hover,
  .shuffle-btn:hover,
  .shuffle-btn.is-spinning .shuffle-icon,
  .review-swap-enter-active,
  .review-swap-leave-active {
    transform: none;
    transition: none;
  }
}
</style>
