<template>
  <section id="como-trabajamos" class="process" aria-labelledby="process-title">
    <div class="container">
      <header class="head">
        <component :is="page ? 'h1' : 'h2'" id="process-title" class="title">Un proceso claro, de la idea a producción</component>
        <p>Sabrás en todo momento qué estamos haciendo, cuánto falta y qué sigue.</p>
      </header>

      <!-- Los pasos se conectan con un trazo continuo, como un circuito -->
      <ol class="steps">
        <li v-for="(step, index) in processSteps" :key="step.title" class="step">
          <span class="marker" aria-hidden="true">
            <span class="node"></span>
            <span class="number">{{ index + 1 }}</span>
          </span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>

      <div class="stack">
        <h3>Tecnologías con las que trabajamos</h3>
        <ul>
          <li v-for="tech in techStack" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// page: la sección se muestra como página propia (su título pasa a ser h1)
defineProps<{ page?: boolean }>()

import { processSteps, techStack } from '@/data/process'
</script>

<style scoped>
.process {
  background: var(--paper);
  padding: var(--section-space) 0;
}

.head {
  max-width: 640px;
  margin-bottom: clamp(48px, 6vw, 72px);
}

.title {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.head p {
  margin: 16px 0 0;
  color: var(--muted);
  font-size: var(--text-lg);
}

.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
  position: relative;
}

/* Trazo horizontal que une los nodos */
.steps::before {
  content: '';
  position: absolute;
  top: 19px;
  left: 20px;
  /* termina en el centro del último nodo: ancho de una columna menos su mitad del nodo */
  right: calc((100% - 96px) / 4 - 20px);
  height: 2px;
  background: var(--signal);
  opacity: 0.35;
}

.step {
  position: relative;
}

.marker {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: 24px;
}

.node {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--signal);
}

.number {
  position: relative;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--signal);
}

.step h3 {
  font-size: var(--text-lg);
  color: var(--ink);
  margin-bottom: 10px;
}

.step p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

.stack {
  margin-top: clamp(56px, 7vw, 88px);
  padding-top: 40px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 16px 32px;
}

.stack h3 {
  font-size: 1rem;
  color: var(--ink);
}

.stack ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
}

.stack li {
  color: var(--muted);
  font-weight: 500;
}

@media (max-width: 900px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 36px;
    padding-left: 60px;
  }

  /* En móvil el trazo es vertical */
  .steps::before {
    top: 20px;
    bottom: 20px;
    left: 19px;
    right: auto;
    width: 2px;
    height: auto;
  }

  .marker {
    position: absolute;
    left: -60px;
    top: -6px;
    margin: 0;
  }
}
</style>
