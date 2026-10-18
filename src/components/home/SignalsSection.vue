<template>
  <section class="signals" aria-labelledby="signals-title">
    <div class="container layout">
      <div class="intro">
        <h2 id="signals-title">¿Te suena familiar?</h2>
        <p>
          Estas situaciones cuestan horas de trabajo, errores y oportunidades cada semana.
          Todas tienen solución con la tecnología correcta.
        </p>
        <router-link to="/cotizar" class="btn btn-primary">Cuéntanos tu caso</router-link>
      </div>

      <ul class="list">
        <li v-for="signal in items" :key="signal.text" class="item">
          <p class="text">{{ signal.text }}</p>
          <router-link :to="quoteLink(signal.service.slug)" class="solution">
            <ServiceIcon :name="signal.service.icon" class="solution-icon" />
            <span>Lo resolvemos con <strong>{{ signal.service.shortTitle }}</strong></span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { quoteLink } from '@/data/sections'
import { signals } from '@/data/signals'
import { serviceBySlug } from '@/data/services'
import ServiceIcon from '@/components/ServiceIcon.vue'

const items = signals.map((s) => ({ text: s.text, service: serviceBySlug(s.service)! }))
</script>

<style scoped>
.signals {
  background: var(--paper);
  padding: var(--section-space) 0;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}

.intro {
  position: sticky;
  top: calc(var(--header-height) + 32px);
}

h2 {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.intro p {
  margin: 20px 0 32px;
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.6;
  max-width: 34ch;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 32px;
}

.item {
  padding: 26px 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.text {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.solution {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: var(--text-sm);
  text-decoration: none;
  margin-top: auto;
}

.solution strong {
  color: var(--signal);
  font-weight: 600;
}

.solution:hover strong {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.solution-icon {
  width: 22px;
  height: 22px;
  color: var(--signal);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .intro {
    position: static;
  }
}

@media (max-width: 560px) {
  .list {
    grid-template-columns: 1fr;
  }
}
</style>
