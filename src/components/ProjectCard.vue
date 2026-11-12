<template>
  <article class="project-card">
    <div class="head">
      <span class="icon" aria-hidden="true"><ServiceIcon :name="icon" /></span>
      <span class="category">{{ project.category }}</span>
    </div>
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>

    <ul v-if="project.tags?.length" class="tags" :aria-label="`Tecnologías de ${project.title}`">
      <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
    </ul>

    <a v-if="project.link" :href="project.link" class="link" target="_blank" rel="noopener noreferrer">
      Ver proyecto <span aria-hidden="true">→</span>
    </a>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ServiceIcon from '@/components/ServiceIcon.vue'
import services from '@/data/services'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project }>()

// El ícono es el del servicio al que pertenece el proyecto
const icon = computed(() => services.find((s) => s.shortTitle === props.project.category)?.icon ?? 'code')
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: var(--signal);
  box-shadow: 0 12px 30px -20px rgba(11, 101, 163, 0.5);
}

.head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md, 12px);
  background: var(--paper);
  color: var(--signal);
}

.category {
  color: var(--signal);
  font-size: var(--text-sm);
  font-weight: 600;
}

h3 {
  margin-bottom: 10px;
  font-size: 1.25rem;
  color: var(--ink);
}

p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

.tags {
  list-style: none;
  margin: 20px 0 0;
  padding: 16px 0 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags li {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8125rem;
}

.link {
  margin-top: auto;
  padding-top: 20px;
  color: var(--signal);
  font-weight: 600;
  text-decoration: none;
}
</style>
