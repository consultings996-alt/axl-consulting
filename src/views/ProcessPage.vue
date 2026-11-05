<template>
  <ProcessSection page />
  <CtaBand />
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import ProcessSection from '@/components/home/ProcessSection.vue'
import CtaBand from '@/components/CtaBand.vue'

usePageMeta({
  title: 'Cómo trabajamos',
  description: 'Nuestro proceso de desarrollo de software: diagnóstico, propuesta por escrito, desarrollo iterativo con demos frecuentes y soporte después del lanzamiento.',
  path: '/como-trabajamos'
})
</script>
