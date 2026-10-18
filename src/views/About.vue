<template>
  <div>
    <PageHero
      kicker="Nosotros"
      title="Advanced eXponential Logic"
      lead="Infraestructura digital diseñada para el crecimiento exponencial."
    />

    <!-- Historia -->
    <section class="story">
      <div class="container layout">
        <div>
          <h2>El origen de A.X.L</h2>
          <p>
            A.X.L – Advanced eXponential Logic nace con la visión de crear soluciones tecnológicas que no solo
            cumplan una función operativa, sino que impulsen el crecimiento exponencial de empresas y emprendedores.
          </p>
          <p>
            Desde su concepción, A.X.L fue diseñada como una consultora tecnológica estratégica, enfocada en
            arquitectura moderna, software escalable y transformación digital. Nuestro enfoque combina ingeniería
            de alto nivel, metodologías ágiles y visión empresarial para convertir ideas en sistemas inteligentes
            y rentables.
          </p>
        </div>
        <blockquote>
          <p>No desarrollamos únicamente software. Diseñamos infraestructura digital para el crecimiento.</p>
        </blockquote>
      </div>
    </section>

    <!-- Misión y visión -->
    <section class="purpose on-dark">
      <div class="container grid-2">
        <article class="panel">
          <h2>Misión</h2>
          <p>
            Desarrollar soluciones de software innovadoras, escalables y eficientes que impulsen el crecimiento
            exponencial de nuestros clientes, combinando ingeniería de alto nivel, metodologías ágiles y visión
            estratégica.
          </p>
        </article>
        <article class="panel">
          <h2>Visión</h2>
          <p>
            Ser una empresa tecnológica de referencia en Latinoamérica y el mundo, reconocida por crear sistemas
            inteligentes, confiables y de alto rendimiento que transformen digitalmente a las organizaciones.
          </p>
        </article>
      </div>
    </section>

    <!-- Valores -->
    <section class="values">
      <div class="container">
        <h2>Valores que nos definen</h2>
        <ul>
          <li v-for="value in values" :key="value.title">
            <h3>{{ value.title }}</h3>
            <p>{{ value.desc }}</p>
          </li>
        </ul>
        <div class="cta">
          <p>¿Quieres trabajar con nosotros en tu próximo proyecto?</p>
          <router-link to="/cotizar" class="btn btn-primary">Cotizar un proyecto</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'

usePageMeta({
  title: 'Nosotros',
  description: 'Conoce la historia, misión, visión y valores de A.X.L – Advanced eXponential Logic, consultora de desarrollo de software en México.',
  path: '/about'
})

const values = [
  { title: 'Innovación continua', desc: 'Siempre a la vanguardia tecnológica.' },
  { title: 'Excelencia técnica', desc: 'Ingeniería de alto nivel en cada línea de código.' },
  { title: 'Compromiso con la calidad', desc: 'Sistemas robustos y confiables.' },
  { title: 'Transparencia y confianza', desc: 'Relaciones sólidas basadas en la honestidad.' },
  { title: 'Orientación a resultados', desc: 'Soluciones que generan impacto real.' },
  { title: 'Escalabilidad', desc: 'Sistemas preparados para el futuro.' }
]
</script>

<style scoped>
section h2 {
  font-size: var(--text-3xl);
}

/* Historia */
.story {
  padding: var(--section-space) 0;
  background: #ffffff;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: center;
}

.story h2 {
  color: var(--ink);
  margin-bottom: 24px;
}

.story p {
  color: var(--muted);
  font-size: var(--text-lg);
  line-height: 1.7;
  max-width: 60ch;
}

blockquote {
  margin: 0;
  padding: 8px 0 8px 28px;
  border-left: 3px solid var(--signal);
}

blockquote p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--ink) !important;
}

/* Misión y visión */
.purpose {
  background: var(--ink);
  color: #ffffff;
  padding: var(--section-space) 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.panel {
  position: relative;
  padding: clamp(28px, 4vw, 44px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-dark);
  background: linear-gradient(180deg, rgba(159, 220, 245, 0.06), rgba(159, 220, 245, 0.015)), var(--ink-raised);
}

.panel::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ice), transparent);
}

.panel h2 {
  font-size: var(--text-xl);
  margin-bottom: 16px;
}

.panel p {
  margin: 0;
  color: var(--muted-dark);
  font-size: var(--text-lg);
  line-height: 1.65;
}

/* Valores */
.values {
  padding: var(--section-space) 0;
  background: var(--paper);
}

.values h2 {
  color: var(--ink);
  margin-bottom: clamp(36px, 5vw, 56px);
}

.values ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 40px;
}

.values li {
  padding: 24px 0;
  border-top: 1px solid var(--line);
}

.values h3 {
  font-size: var(--text-lg);
  color: var(--ink);
  margin-bottom: 8px;
}

.values li p {
  margin: 0;
  color: var(--muted);
}

.cta {
  margin-top: clamp(48px, 6vw, 72px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 32px;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid var(--line);
}

.cta p {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--ink);
}

@media (max-width: 900px) {
  .layout,
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .values ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .values ul {
    grid-template-columns: 1fr;
  }
}
</style>
