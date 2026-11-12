<template>
  <div>
    <PageHero :title="title" :lead="updated ? `Última actualización: ${updated}` : undefined" />
    <section class="legal">
      <div class="container">
        <div class="prose">
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PageHero from '@/components/PageHero.vue'

defineProps<{ title: string; updated?: string }>()
</script>

<style scoped>
.legal {
  padding: clamp(48px, 7vw, 80px) 0 var(--section-space);
  background: #ffffff;
}

.prose {
  max-width: 68ch;
  color: var(--color-text-body);
  font-size: var(--text-base);
  line-height: 1.75;
}

.prose :deep(h2) {
  margin: 2em 0 0.6em;
  font-size: 1.25rem;
  color: var(--ink);
}

.prose :deep(h2:first-child) {
  margin-top: 0;
}

.prose :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}

/* Datos por llenar: resaltados para que no se publiquen sin darse cuenta */
.prose :deep(mark.pending) {
  padding: 1px 6px;
  border-radius: 4px;
  background: #fff1c2;
  color: #6b4e00;
  font-weight: 600;
}

.prose :deep(p) {
  margin: 0 0 1.1em;
}

.prose :deep(ul) {
  margin: 0 0 1.2em;
  padding-left: 1.2em;
  display: grid;
  gap: 0.5em;
}

.prose :deep(li::marker) {
  color: var(--signal);
}

.prose :deep(a) {
  color: var(--signal);
  font-weight: 600;
}
</style>
