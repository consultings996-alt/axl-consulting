<template>
  <section class="explore" aria-labelledby="explore-title">
    <div class="container">
      <header class="head">
        <h2 id="explore-title">Conoce cómo podemos ayudarte</h2>
        <p>Todo lo que necesitas saber antes de cotizar, en tres páginas.</p>
      </header>

      <ul class="grid">
        <li v-for="card in cards" :key="card.to">
          <router-link :to="card.to" class="card">
            <span class="kicker">{{ card.kicker }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
            <ul class="preview" aria-hidden="true">
              <li v-for="item in card.preview" :key="item">{{ item }}</li>
            </ul>
            <span class="more">{{ card.cta }} <span aria-hidden="true">→</span></span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pages } from '@/data/pages'
import services from '@/data/services'
import { processSteps } from '@/data/process'
import profiles from '@/data/profiles'

/** Resumen de las páginas principales: se arma con los mismos datos que cada página */
const cards = [
  {
    to: pages.servicios,
    kicker: `${services.length} servicios`,
    title: 'Lo que construimos',
    text: 'Software a medida, cloud, web y móvil, automatización e integraciones.',
    preview: services.map((s) => s.shortTitle),
    cta: 'Ver servicios'
  },
  {
    to: pages.comoTrabajamos,
    kicker: `${processSteps.length} pasos`,
    title: 'Cómo trabajamos',
    text: 'Un proceso claro, de la primera llamada al soporte después del lanzamiento.',
    preview: processSteps.map((s) => s.title),
    cta: 'Ver el proceso'
  },
  {
    to: pages.perfiles,
    kicker: `${profiles.length} perfiles · Jr a Sr`,
    title: 'Arma tu equipo',
    text: 'Especialistas por rol y nivel: desde un perfil puntual hasta un equipo completo.',
    preview: profiles.map((p) => p.role),
    cta: 'Ver perfiles'
  }
]
</script>

<style scoped>
.explore {
  background: #ffffff;
  padding: var(--section-space) 0;
}

.head {
  max-width: 640px;
  margin-bottom: clamp(36px, 5vw, 56px);
}

h2 {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.head p {
  margin: 16px 0 0;
  color: var(--muted);
  font-size: var(--text-lg);
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.grid > li {
  display: flex;
}

.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--signal);
  box-shadow: 0 12px 30px -20px rgba(11, 101, 163, 0.5);
  transform: translateY(-2px);
}

.kicker {
  color: var(--signal);
  font-size: var(--text-sm);
  font-weight: 600;
}

h3 {
  margin: 8px 0 10px;
  font-size: 1.35rem;
  color: var(--ink);
}

.card > p {
  margin: 0 0 20px;
  color: var(--muted);
  line-height: 1.6;
}

.preview {
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preview li {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8125rem;
}

.more {
  margin-top: auto;
  color: var(--signal);
  font-weight: 600;
}

.card:hover .more span {
  display: inline-block;
  transform: translateX(3px);
  transition: transform 0.2s ease;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}
</style>
