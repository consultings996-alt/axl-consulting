<template>
  <article class="project-card">
    <div class="image-wrapper">
      <img :src="project.image" :alt="project.title" loading="lazy" />
      <!-- Solo se muestra cuando el proyecto tiene un enlace real -->
      <div v-if="hasLink" class="overlay">
        <a :href="project.link" class="view-btn" target="_blank" rel="noopener noreferrer">
          {{ ctaLabel }}
        </a>
      </div>
    </div>
    <div class="content">
      <div class="tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/data/projects'

const props = withDefaults(defineProps<{ project: Project; ctaLabel?: string }>(), {
  ctaLabel: 'Ver proyecto'
})

const hasLink = computed(() => Boolean(props.project.link) && props.project.link !== '#')
</script>

<style scoped>
.project-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color 0.2s ease;
  background: #ffffff;
  border: 1px solid var(--line);
}

.project-card:hover {
  border-color: var(--signal);
}

.image-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .image-wrapper img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 26, 47, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .overlay,
.project-card:focus-within .overlay {
  opacity: 1;
}

.view-btn {
  background: #ffffff;
  color: var(--ink);
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.project-card:hover .view-btn,
.project-card:focus-within .view-btn {
  transform: translateY(0);
}

.content {
  padding: 30px;
}

.tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tag {
  background: var(--paper);
  color: var(--muted);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 12px;
}

p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}
</style>
