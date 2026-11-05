<template>
  <div class="projects-page">
    <PageHero
      kicker="Proyectos"
      title="Proyectos que hemos construido"
      lead="Casos reales de software a medida, integraciones y automatización."
    />

    <div class="container content-wrapper">
      <!-- Filter Tags -->
      <div class="filters">
        <button 
          v-for="category in categories" 
          :key="category"
          class="filter-btn"
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <TransitionGroup name="fade">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            cta-label="Ver detalles"
          />
        </TransitionGroup>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>No se encontraron proyectos en esta categoría.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import projects from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'
import PageHero from '@/components/PageHero.vue'

usePageMeta({
  title: 'Proyectos',
  description: 'Proyectos de desarrollo de software a medida, plataformas web y móviles, automatización e integraciones realizados por A.X.L.',
  path: '/projects'
})

const ALL = 'Todos'
const activeCategory = ref<string>(ALL)

// Las categorías salen de los propios proyectos: si se agrega una nueva, aparece su filtro
const categories = computed(() => [ALL, ...new Set(projects.map((p) => p.category))])

const filteredProjects = computed(() =>
  activeCategory.value === ALL ? projects : projects.filter((p) => p.category === activeCategory.value)
)
</script>

<style scoped>
.projects-page {
  background-color: var(--paper);
  min-height: 100vh;
}

.content-wrapper {
  padding-top: 60px;
  padding-bottom: 100px;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 50px;
}

.filter-btn {
  background: #ffffff;
  border: 1px solid var(--line);
  padding: 10px 24px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.filter-btn:hover {
  background: var(--paper);
  color: var(--ink);
}

.filter-btn.active {
  background: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--muted);
}

/* Transitions */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
