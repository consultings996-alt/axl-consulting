<template>
  <ProfilesSection page />
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import ProfilesSection from '@/components/home/ProfilesSection.vue'

usePageMeta({
  title: 'Perfiles para tu proyecto',
  description: 'Especialistas en Frontend, Backend, Full Stack, móvil, cloud, automatización, QA y arquitectura, de nivel Jr a Sr, para tu proyecto o tu equipo.',
  path: '/perfiles'
})
</script>
