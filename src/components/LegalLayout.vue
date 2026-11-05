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
  color: var(--ink);
  font-size: var(--text-base);
  line-height: 1.75;
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
