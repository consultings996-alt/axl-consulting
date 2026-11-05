<template>
  <!-- Inicio corto: el detalle de servicios, proceso, perfiles y cotización vive en su propia página -->
  <HeroSection />
  <SignalsSection />
  <AboutSection />
  <ProjectsSection v-if="hasProjects" />
  <ExploreSection />
  <ReviewsSection />
  <CtaBand />
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HeroSection from '@/components/home/HeroSection.vue'
import SignalsSection from '@/components/home/SignalsSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import ExploreSection from '@/components/home/ExploreSection.vue'
import ReviewsSection from '@/components/home/ReviewsSection.vue'
import CtaBand from '@/components/CtaBand.vue'
import { hasProjects } from '@/data/projects'
import { useHead } from '@unhead/vue'
import { company, socialLinks } from '@/data/company'
import services from '@/data/services'
import { absoluteUrl } from '@/data/site'

usePageMeta({
  title: 'Desarrollo de software a medida en México',
  description: 'Consultora de software en México: desarrollo a medida, microservicios y cloud, plataformas web y móviles, automatización de procesos e integraciones para hacer crecer tu negocio.',
  path: '/'
})

// Datos estructurados: ayudan a Google a entender quién es la empresa y qué ofrece
useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: company.legalName,
        alternateName: company.name,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/apple-touch-icon.png'),
        image: absoluteUrl('/og-image.png'),
        email: company.email,
        telephone: company.phone.href.replace('tel:', ''),
        address: { '@type': 'PostalAddress', addressCountry: 'MX' },
        areaServed: 'MX',
        sameAs: socialLinks.filter((s) => s.id !== 'whatsapp').map((s) => s.url),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.description }
          }))
        }
      }).replace(/</g, '\\u003c')
    }
  ]
})
</script>
