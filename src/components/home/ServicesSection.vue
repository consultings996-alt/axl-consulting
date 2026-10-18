<template>
  <section id="servicios" class="services" aria-labelledby="services-title">
    <div class="container">
      <header class="head">
        <h2 id="services-title">Lo que construimos para tu empresa</h2>
        <p>Seis formas de usar la tecnología para operar mejor, crecer y escalar.</p>
      </header>

      <ul class="grid">
        <li v-for="service in services" :key="service.id" class="service">
          <span class="icon-box">
            <ServiceIcon :name="service.icon" />
          </span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <router-link :to="quoteLink(service.slug)" class="quote-link">
            Cotizar este servicio
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { quoteLink } from '@/data/sections'
import services from '@/data/services'
import ServiceIcon from '@/components/ServiceIcon.vue'
</script>

<style scoped>
.services {
  background: #ffffff;
  padding: var(--section-space) 0;
}

.head {
  max-width: 640px;
  margin-bottom: clamp(48px, 6vw, 72px);
}

h2 {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.head p {
  margin: 16px 0 0;
  color: var(--muted);
  font-size: var(--text-lg);
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 56px 40px;
}

.service {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.icon-box {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--paper);
  color: var(--signal);
}

h3 {
  font-size: var(--text-lg);
  color: var(--ink);
  margin-bottom: 12px;
}

.service p {
  margin: 0 0 20px;
  color: var(--muted);
  line-height: 1.65;
}

.quote-link {
  margin-top: auto;
  color: var(--signal);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition: text-decoration-color 0.15s ease;
}

.quote-link:hover {
  text-decoration-color: currentColor;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
}
</style>
