<template>
  <section id="cotizar" class="quote on-dark" aria-labelledby="quote-title">
    <div class="container layout">
      <div class="intro">
        <component :is="page ? 'h1' : 'h2'" id="quote-title" class="title">Cuéntanos qué necesitas y te enviamos una propuesta</component>
        <p class="lead">Dos pasos, menos de dos minutos. Sin compromiso.</p>
      </div>

      <QuoteForm class="form" />

      <div class="details">
        <ol class="next">
          <li v-for="item in nextSteps" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </li>
        </ol>

        <div class="direct">
          <p>¿Prefieres hablar directo?</p>
          <ul>
            <li><a :href="whatsapp.url" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
            <li><a :href="company.phone.href">{{ company.phone.display }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// page: la sección se muestra como página propia (su título pasa a ser h1)
defineProps<{ page?: boolean }>()

import QuoteForm from '@/components/QuoteForm.vue'
import { company, social } from '@/data/company'
import { nextSteps } from '@/data/quote'

const whatsapp = social('whatsapp')
</script>

<style scoped>
.quote {
  background: var(--ink);
  color: #ffffff;
  padding: var(--section-space) 0;
}

/* Escritorio: texto a la izquierda, formulario a la derecha.
   Móvil: titular, formulario y después los detalles. */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  grid-template-areas:
    'intro form'
    'details form';
  grid-template-rows: auto 1fr;
  column-gap: clamp(40px, 6vw, 80px);
  align-items: start;
}

.intro {
  grid-area: intro;
}

.form {
  grid-area: form;
}

.details {
  grid-area: details;
}

.title {
  font-size: var(--text-3xl);
  max-width: 20ch;
}

.lead {
  margin: 20px 0 40px;
  color: var(--muted-dark);
  font-size: var(--text-lg);
}

.next {
  list-style: none;
  counter-reset: step;
  margin: 0 0 40px;
  padding: 0;
  display: grid;
  gap: 22px;
}

.next li {
  counter-increment: step;
  position: relative;
  padding-left: 48px;
}

.next li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 2px solid var(--ice);
  color: var(--ice);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
}

.next strong {
  display: block;
  font-weight: 600;
  margin-bottom: 2px;
}

.next span {
  color: var(--muted-dark);
  font-size: 0.95rem;
}

.direct {
  padding-top: 28px;
  border-top: 1px solid var(--line-dark);
}

.direct p {
  margin: 0 0 12px;
  font-weight: 600;
}

.direct ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}

.direct a {
  color: var(--ice);
  text-decoration: none;
}

.direct a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      'intro'
      'form'
      'details';
    grid-template-rows: auto;
  }

  .lead {
    margin-bottom: 32px;
  }

  .details {
    margin-top: 48px;
  }
}
</style>
