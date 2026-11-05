<template>
  <QuoteSection page />
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import QuoteSection from '@/components/home/QuoteSection.vue'

usePageMeta({
  title: 'Cotizar proyecto',
  description: 'Cuéntanos qué necesitas y te enviamos una propuesta con alcance, tiempos y costo. Dos pasos, menos de dos minutos, sin compromiso.',
  path: '/cotizar'
})
</script>
