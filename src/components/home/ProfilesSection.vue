<template>
  <section :id="homeSections.perfiles.id" class="profiles" aria-labelledby="profiles-title">
    <div class="container">
      <header class="head">
        <h2 id="profiles-title">Arma el equipo que tu proyecto necesita</h2>
        <p>
          Asignamos especialistas por rol y nivel de experiencia: desde un perfil puntual para reforzar a tu equipo
          hasta un equipo completo.
        </p>
      </header>

      <!-- Qué significa cada nivel -->
      <dl class="levels">
        <div v-for="level in levels" :key="level.id" class="level">
          <dt><span class="pill on">{{ level.label }}</span></dt>
          <dd>{{ level.description }}</dd>
        </div>
      </dl>

      <ul class="grid">
        <li v-for="profile in profiles" :key="profile.id" class="card">
          <h3>{{ profile.role }}</h3>
          <p class="desc">{{ profile.description }}</p>

          <!-- Niveles y skills van juntos al pie para que se alineen entre tarjetas -->
          <div class="card-foot">
            <p class="visually-hidden">Niveles disponibles: {{ availableLabels(profile) }}</p>
            <div class="card-levels" aria-hidden="true">
              <span
                v-for="level in levels"
                :key="level.id"
                class="pill"
                :class="profile.levels.includes(level.id) ? 'on' : 'off'"
              >{{ level.label }}</span>
            </div>

            <ul class="skills" :aria-label="`Skills de ${profile.role}`">
              <li v-for="skill in profile.skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="cta">
        <p>¿Un equipo completo o solo una funcionalidad puntual? Cotizamos ambos.</p>
        <router-link :to="homeSections.cotizar.path" class="btn btn-primary">Cuéntanos qué buscas</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import profiles, { levels, type Profile } from '@/data/profiles'
import { homeSections } from '@/data/sections'

const availableLabels = (profile: Profile) =>
  levels.filter((l) => profile.levels.includes(l.id)).map((l) => l.label).join(', ')
</script>

<style scoped>
.profiles {
  background: #ffffff;
  padding: var(--section-space) 0;
}

.head {
  max-width: 680px;
  margin-bottom: 40px;
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

/* Leyenda de niveles */
.levels {
  margin: 0 0 clamp(40px, 5vw, 56px);
  padding: 20px 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 32px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--paper);
}

.level {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.level dt {
  flex-shrink: 0;
}

.level dd {
  margin: 0;
  color: var(--muted);
  font-size: var(--text-sm);
  line-height: 1.55;
}

/* Etiquetas de nivel */
.pill {
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
}

.pill.on {
  background: var(--signal);
  color: #ffffff;
}

.pill.off {
  border: 1px dashed var(--line);
  color: var(--muted);
  opacity: 0.55;
}

/* Tarjetas de perfil */
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--signal);
  box-shadow: 0 10px 28px -18px rgba(11, 101, 163, 0.45);
}

h3 {
  font-size: 1.125rem;
  color: var(--ink);
  margin-bottom: 10px;
}

.desc {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.card-foot {
  margin-top: auto;
}

.card-levels {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
}

.skills {
  list-style: none;
  margin: 0;
  padding: 16px 0 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skills li {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8125rem;
}

.cta {
  margin-top: clamp(40px, 5vw, 56px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  padding: 24px 28px;
  border-radius: var(--radius-lg);
  background: var(--paper);
}

.cta p {
  margin: 0;
  color: var(--ink);
  font-weight: 600;
  font-size: var(--text-lg);
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .levels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
