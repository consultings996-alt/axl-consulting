<template>
  <ServicesSection page />
  <CtaBand />
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import ServicesSection from '@/components/home/ServicesSection.vue'
import CtaBand from '@/components/CtaBand.vue'

usePageMeta({
  title: 'Servicios de desarrollo de software',
  description: 'Desarrollo de software a medida, microservicios y cloud, plataformas web y móviles, automatización de procesos, integraciones y transformación digital para empresas en México.',
  path: '/servicios'
})
</script>
