<template>
  <div>
    <PageHero
      kicker="Carreras"
      title="Únete a nuestro equipo"
      lead="Buscamos personas creativas y apasionadas por la tecnología que quieran construir sistemas que importan."
    />

    <section class="why">
      <div class="container">
        <h2>Por qué trabajar en A.X.L</h2>
        <p class="intro">
          Ofrecemos un ambiente flexible, proyectos desafiantes y aprendizaje continuo.
        </p>
        <ul class="benefits">
          <li v-for="benefit in benefits" :key="benefit.title">
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="positions" aria-labelledby="positions-title">
      <div class="container">
        <h2 id="positions-title">Vacantes abiertas</h2>
        <ul class="jobs">
          <li v-for="job in jobs" :key="job.id" class="job">
            <div>
              <h3>{{ job.title }}</h3>
              <p>{{ job.type }} · {{ job.location }}</p>
            </div>
            <a :href="applyHref(job.title)" class="btn btn-primary">Aplicar</a>
          </li>
        </ul>
        <p class="note">
          ¿No ves una vacante para ti? Envíanos tu CV a
          <a :href="`mailto:${company.email}?subject=${encodeURIComponent('Postulación espontánea')}`">{{ company.email }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'
import { company } from '@/data/company'
import { careerBenefits as benefits, jobOpenings as jobs, applyHref } from '@/data/careers'

usePageMeta({
  title: 'Carreras',
  description: 'Únete al equipo de A.X.L – Advanced eXponential Logic. Descubre nuestras vacantes y crece profesionalmente con nosotros.',
  path: '/careers'
})
</script>

<style scoped>
section h2 {
  font-size: var(--text-3xl);
  color: var(--ink);
}

.why {
  padding: var(--section-space) 0 clamp(48px, 6vw, 72px);
  background: #ffffff;
}

.intro {
  margin: 16px 0 clamp(36px, 5vw, 48px);
  color: var(--muted);
  font-size: var(--text-lg);
  max-width: 56ch;
}

.benefits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 40px;
}

.benefits li {
  padding-top: 24px;
  border-top: 2px solid var(--signal);
}

.benefits h3 {
  font-size: var(--text-lg);
  color: var(--ink);
  margin-bottom: 8px;
}

.benefits p {
  margin: 0;
  color: var(--muted);
}

.positions {
  padding: clamp(48px, 6vw, 72px) 0 var(--section-space);
  background: var(--paper);
}

.positions h2 {
  margin-bottom: 32px;
}

.jobs {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.job {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.job h3 {
  font-size: var(--text-lg);
  color: var(--ink);
}

.job p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.job .btn {
  min-height: 42px;
  padding: 10px 20px;
  flex-shrink: 0;
}

.note {
  margin: 28px 0 0;
  color: var(--muted);
}

.note a {
  color: var(--signal);
  font-weight: 600;
}

@media (max-width: 760px) {
  .benefits {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

@media (max-width: 480px) {
  .job {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
