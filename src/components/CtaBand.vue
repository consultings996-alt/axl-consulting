<template>
  <section class="cta-band on-dark" aria-labelledby="cta-band-title">
    <div class="container inner">
      <div>
        <h2 id="cta-band-title">{{ title }}</h2>
        <p>{{ text }}</p>
      </div>
      <div class="actions">
        <router-link :to="pages.cotizar" class="btn btn-ice">Cotizar proyecto</router-link>
        <a :href="whatsapp.url" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pages } from '@/data/pages'
import { social } from '@/data/company'

/** Franja de cierre que invita a cotizar; va al final de las páginas */
withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: '¿Listo para empezar?',
  text: 'Cuéntanos qué necesitas: un proyecto completo, un equipo o una funcionalidad puntual. Te respondemos con una propuesta.'
})

const whatsapp = social('whatsapp')
</script>

<style scoped>
.cta-band {
  background: var(--ink);
  color: #ffffff;
  padding: clamp(56px, 7vw, 88px) 0;
}

.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px 48px;
}

h2 {
  font-size: var(--text-2xl);
  letter-spacing: -0.02em;
}

p {
  margin: 12px 0 0;
  max-width: 56ch;
  color: var(--muted-dark);
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
