<template>
  <section class="about on-dark" aria-labelledby="about-title">
    <div class="container layout">
      <div class="text">
        <p class="kicker">Quiénes somos</p>
        <h2 id="about-title">Somos el acelerador que impulsa el crecimiento en Latinoamérica</h2>
        <p class="lead">
          En A.X.L combinamos experiencia tecnológica, ingeniería digital, inteligencia artificial
          y consultoría estratégica para impulsar empresas hacia una transformación digital real.
        </p>
        <ul class="tags">
          <li v-for="tag in tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>

      <aside class="panel" aria-labelledby="why-axl">
        <h3 id="why-axl">¿Por qué A.X.L?</h3>
        <ul>
          <li v-for="item in highlights" :key="item.title">
            <svg class="node" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="5" />
            </svg>
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.description }}</span>
            </div>
          </li>
        </ul>
        <router-link to="/cotizar" class="btn btn-ice">Agendar una llamada</router-link>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const tags = ['Ingeniería de excelencia', 'Servicios nearshore', 'Consultoría especializada', 'Innovación con IA']

const highlights = [
  {
    title: 'Ingeniería con experiencia real',
    description: 'Equipo con experiencia en sistemas empresariales, gobierno, finanzas e inteligencia artificial.'
  },
  {
    title: 'Comunicación directa',
    description: 'Hablas con quien diseña y construye tu solución, sin intermediarios.'
  },
  {
    title: 'Entregas cortas y visibles',
    description: 'Avances funcionales cada pocas semanas, no solo al final del proyecto.'
  },
  {
    title: 'Acompañamiento después del lanzamiento',
    description: 'Soporte, mejoras y evolución de tu sistema cuando ya está en producción.'
  }
]
</script>

<style scoped>
.about {
  background: var(--ink);
  color: #ffffff;
  padding: var(--section-space) 0;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: center;
}

.kicker {
  margin: 0 0 16px;
  color: var(--ice);
  font-weight: 600;
  font-size: 0.95rem;
}

h2 {
  font-size: var(--text-3xl);
  max-width: 18ch;
}

.lead {
  margin: 24px 0 32px;
  color: var(--muted-dark);
  font-size: var(--text-lg);
  line-height: 1.65;
  max-width: 50ch;
}

.tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tags li {
  padding: 7px 14px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius-pill);
  color: var(--muted-dark);
  font-size: var(--text-sm);
}

/* Panel con borde translúcido y brillo sutil del acento */
.panel {
  position: relative;
  padding: clamp(28px, 4vw, 44px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-dark);
  background: linear-gradient(180deg, rgba(159, 220, 245, 0.06), rgba(159, 220, 245, 0.015)), var(--ink-raised);
  box-shadow: 0 0 0 1px rgba(159, 220, 245, 0.04), 0 30px 80px -30px rgba(159, 220, 245, 0.25);
}

.panel::before {
  /* línea de luz en el borde superior */
  content: '';
  position: absolute;
  top: -1px;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ice), transparent);
}

.panel h3 {
  font-size: var(--text-xl);
  margin-bottom: 28px;
}

.panel ul {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  display: grid;
  gap: 22px;
}

.panel li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.node {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  fill: var(--ink);
  stroke: var(--ice);
  stroke-width: 2;
}

.panel strong {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.panel li span {
  color: var(--muted-dark);
  font-size: 0.95rem;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
