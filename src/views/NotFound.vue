<template>
  <section class="not-found on-dark">
    <div class="container">
      <!-- Un trazo de circuito que se corta: la ruta no lleva a ningún lado -->
      <svg class="trace" viewBox="0 0 320 80" aria-hidden="true">
        <path d="M0 40 H120 V16 H170" />
        <path class="broken" d="M200 16 H240 V64 H320" />
        <circle cx="120" cy="40" r="4" />
        <circle cx="170" cy="16" r="4" />
        <circle cx="200" cy="16" r="4" />
      </svg>
      <p class="code">Error 404</p>
      <h1>Esta página no existe</h1>
      <p class="lead">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <div class="actions">
        <router-link to="/" class="btn btn-ice">Ir al inicio</router-link>
        <router-link to="/cotizar" class="btn btn-ghost">Cotizar un proyecto</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Página no encontrada',
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--header-height));
  display: grid;
  align-items: center;
  background: var(--ink);
  color: #ffffff;
  padding: 64px 0;
}

.trace {
  width: 260px;
  max-width: 100%;
  margin-bottom: 32px;
  fill: none;
  stroke: var(--ice);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.trace .broken {
  opacity: 0.35;
  stroke-dasharray: 4 6;
}

.trace circle {
  fill: var(--ink);
}

.code {
  margin: 0 0 12px;
  color: var(--ice);
  font-weight: 600;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.03em;
}

.lead {
  margin: 16px 0 36px;
  color: var(--muted-dark);
  font-size: var(--text-lg);
  max-width: 46ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
</style>
