<template>
  <div>
    <PageHero
      kicker="Proyectos"
      title="Proyectos que hemos construido"
      lead="Algunos de los sistemas que ya están funcionando para nuestros clientes."
    />

    <section class="projects">
      <div class="container">
        <!-- Los filtros solo aparecen cuando hay suficientes proyectos para que sirvan -->
        <div v-if="showFilters" class="filters" role="group" aria-label="Filtrar por tipo de servicio">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="filter"
            :class="{ active: activeCategory === category }"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <ul class="grid">
          <li v-for="project in filteredProjects" :key="project.id">
            <ProjectCard :project="project" />
          </li>
        </ul>
      </div>
    </section>

    <CtaBand title="¿Tienes un proyecto parecido?" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import projects from '@/data/projects'
import { pages } from '@/data/pages'
import ProjectCard from '@/components/ProjectCard.vue'
import PageHero from '@/components/PageHero.vue'
import CtaBand from '@/components/CtaBand.vue'

usePageMeta({
  title: 'Proyectos',
  description: 'Proyectos terminados de A.X.L: plataformas web y móviles, ERP con punto de venta y tienda en línea, y otros sistemas a la medida.',
  path: pages.proyectos
})

const ALL = 'Todos'
const activeCategory = ref<string>(ALL)

// Las categorías salen de los propios proyectos: si se agrega una nueva, aparece su filtro
const categories = computed(() => [ALL, ...new Set(projects.map((p) => p.category))])
const showFilters = computed(() => projects.length > 4 && categories.value.length > 2)

const filteredProjects = computed(() =>
  activeCategory.value === ALL ? projects : projects.filter((p) => p.category === activeCategory.value)
)
</script>

<style scoped>
.projects {
  background: var(--paper);
  padding: clamp(48px, 7vw, 80px) 0 var(--section-space);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.filter {
  padding: 8px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: #ffffff;
  color: var(--muted);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
}

.filter.active {
  background: var(--ink);
  border-color: var(--ink);
  color: #ffffff;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 20px;
}
</style>
