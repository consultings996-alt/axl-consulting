<template>
  <section class="hero on-dark">
    <div class="container hero-grid">
      <div class="copy">
        <h1>Software a la medida que conecta y automatiza tu operación</h1>
        <p class="lead">
          En A.X.L diseñamos, construimos e integramos sistemas para empresas en México:
          plataformas web y móviles, arquitectura en la nube, automatización de procesos
          e integraciones entre las herramientas que ya usas.
        </p>
        <div class="actions">
          <router-link to="/cotizar" class="btn btn-ice">Cotizar un proyecto</router-link>
          <router-link to="/servicios" class="btn btn-ghost">Ver servicios</router-link>
        </div>
      </div>

      <!-- Diagrama: A.X.L al centro conectando los sistemas de una empresa.
           Los trazos imitan las líneas de circuito del logo. -->
      <svg
        class="diagram"
        viewBox="0 0 560 440"
        role="img"
        aria-label="Diagrama: A.X.L conecta tu ERP, CRM, app móvil, nube, pagos y reportes"
      >
        <g class="traces" fill="none">
          <path
            v-for="(d, i) in traces"
            :key="d"
            :d="d"
            pathLength="1"
            :style="{ animationDelay: `${0.15 + i * 0.12}s` }"
          />
        </g>

        <g class="nodes">
          <circle
            v-for="(n, i) in nodes"
            :key="`${n.x}-${n.y}`"
            :cx="n.x"
            :cy="n.y"
            r="4.5"
            :style="{ animationDelay: `${0.9 + (i % 6) * 0.06}s` }"
          />
        </g>

        <g class="systems">
          <g v-for="s in systems" :key="s.label" :transform="`translate(${s.x} ${s.y})`">
            <rect width="120" height="44" rx="8" />
            <text x="60" y="27">{{ s.label }}</text>
          </g>
        </g>

        <g class="core">
          <rect x="216" y="176" width="128" height="88" rx="16" />
          <image :href="icon" x="252" y="192" width="56" height="50" />
        </g>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import icon from '@/assets/brand/logo-icon.webp'

const systems = [
  { label: 'ERP', x: 20, y: 40 },
  { label: 'CRM', x: 20, y: 198 },
  { label: 'App móvil', x: 20, y: 356 },
  { label: 'Nube', x: 420, y: 40 },
  { label: 'Pagos', x: 420, y: 198 },
  { label: 'Reportes', x: 420, y: 356 }
]

// Trazos ortogonales desde cada sistema hasta el núcleo
const traces = [
  'M140 62 H180 V200 H216',
  'M140 220 H216',
  'M140 378 H180 V240 H216',
  'M420 62 H380 V200 H344',
  'M420 220 H344',
  'M420 378 H380 V240 H344'
]

// Nodos en las puntas de cada trazo, como en el logo
const nodes = [
  { x: 140, y: 62 }, { x: 140, y: 220 }, { x: 140, y: 378 },
  { x: 420, y: 62 }, { x: 420, y: 220 }, { x: 420, y: 378 },
  { x: 216, y: 200 }, { x: 216, y: 220 }, { x: 216, y: 240 },
  { x: 344, y: 200 }, { x: 344, y: 220 }, { x: 344, y: 240 }
]
</script>

<style scoped>
.hero {
  background: var(--ink);
  color: #ffffff;
  padding: clamp(56px, 9vw, 112px) 0 clamp(64px, 10vw, 128px);
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 80px);
}

h1 {
  font-size: var(--text-hero);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -0.035em;
  max-width: 19ch;
}

.lead {
  margin: 28px 0 40px;
  max-width: 54ch;
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--muted-dark);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* ---------- Diagrama ---------- */
.diagram {
  width: 100%;
  height: auto;
  overflow: visible;
}

.traces path {
  stroke: var(--ice);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.nodes circle {
  fill: var(--ink);
  stroke: var(--ice);
  stroke-width: 2;
  opacity: 0;
  animation: appear 0.3s ease-out forwards;
}

.systems rect {
  fill: var(--ink-raised);
  stroke: var(--line-dark);
  stroke-width: 1;
}

.systems text {
  fill: #ffffff;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  text-anchor: middle;
}

.core rect {
  fill: var(--ink-raised);
  stroke: var(--ice);
  stroke-width: 2;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes appear {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .traces path {
    animation: none;
    stroke-dashoffset: 0;
  }
  .nodes circle {
    animation: none;
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    max-width: 18ch;
  }

  .systems text {
    font-size: 18px;
  }

  .diagram {
    max-width: 520px;
    margin: 0 auto;
  }
}
</style>
