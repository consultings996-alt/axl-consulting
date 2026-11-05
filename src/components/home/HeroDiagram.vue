<template>
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
  .systems text {
    font-size: 18px;
  }

  .diagram {
    max-width: 520px;
    margin: 0 auto;
  }
}
</style>

