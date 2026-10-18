<template>
  <div>
    <PageHero
      kicker="Insights"
      title="Tecnología explicada para quien toma decisiones"
      lead="Arquitectura de software, automatización y transformación digital, sin tecnicismos innecesarios."
    />

    <section class="soon">
      <div class="container layout">
        <div>
          <h2>Estamos preparando el primer contenido</h2>
          <p>Pronto publicaremos aquí:</p>
          <ul>
            <li v-for="topic in topics" :key="topic">{{ topic }}</li>
          </ul>
        </div>
        <aside class="panel on-dark">
          <h3>Mientras tanto, pregúntanos directo</h3>
          <p>Si tienes una duda sobre tu proyecto o tu operación, con gusto la platicamos.</p>
          <router-link to="/cotizar" class="btn btn-ice">Hablar con un especialista</router-link>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'

usePageMeta({
  title: 'Insights',
  description: 'Artículos sobre arquitectura de software, automatización y transformación digital de A.X.L.',
  path: '/insights'
})

const topics = [
  'Guías de arquitectura, nube y escalabilidad',
  'Casos de estudio de proyectos reales',
  'Automatización e integraciones en la práctica',
  'Noticias y alianzas de A.X.L'
]
</script>

<style scoped>
.soon {
  padding: var(--section-space) 0;
  background: var(--paper);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

h2 {
  font-size: var(--text-2xl);
  color: var(--ink);
}

.layout > div > p {
  margin: 16px 0 12px;
  color: var(--muted);
}

ul {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
  color: var(--ink);
  font-size: var(--text-lg);
}

ul li::marker {
  color: var(--signal);
}

.panel {
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background: var(--ink);
  color: #ffffff;
}

.panel h3 {
  font-size: var(--text-xl);
  margin-bottom: 12px;
}

.panel p {
  margin: 0 0 24px;
  color: var(--muted-dark);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
