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

      <HeroDiagram />
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroDiagram from './HeroDiagram.vue'
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

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    max-width: 18ch;
  }
}
</style>
