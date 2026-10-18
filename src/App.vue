<template>
  <Header />
  <main id="contenido">
    <router-view />
  </main>
  <FloatingActions />
  <Footer />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Header from './components/header/Header.vue'
import FloatingActions from './components/FloatingActions.vue'
import Footer from './components/Footer.vue'
import { useSectionReclick } from './composables/useSectionReclick'

useHead({
  titleTemplate: '%s | A.X.L',
  htmlAttrs: { lang: 'es-MX' },
  meta: [{ name: 'theme-color', content: '#0a1a2f' }]
})

useSectionReclick()
</script>
