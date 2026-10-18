<template>
  <header class="site-header on-dark" :class="{ scrolled }">
    <div class="container bar">
      <router-link to="/" class="brand" aria-label="A.X.L, ir al inicio" @click="closeMenu">
        <img :src="logo" alt="" width="122" height="48" />
      </router-link>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="main-navigation"
        @click="isOpen = !isOpen"
      >
        <span class="visually-hidden">{{ isOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
        <span class="toggle-lines" :class="{ open: isOpen }" aria-hidden="true"></span>
      </button>

      <nav id="main-navigation" class="nav" :class="{ open: isOpen }" aria-label="Principal">
        <ul>
          <li v-for="item in menu" :key="item.label">
            <router-link
              :to="item.link"
              class="nav-link"
              :class="{ active: isActive(item.link) }"
              active-class=""
              exact-active-class=""
              :aria-current="isActive(item.link) ? 'page' : undefined"
              @click="closeMenu"
            >{{ item.label }}</router-link>
          </li>
        </ul>
        <router-link :to="contactLink.link" class="btn btn-ice nav-cta" @click="closeMenu">
          {{ contactLink.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { sectionForPath } from '@/data/sections'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import menu, { contactLink } from '@/data/menu'
import logo from '@/assets/brand/logo-axl.webp'

const DESKTOP_BREAKPOINT = 980
const route = useRoute()

// Los enlaces a secciones del inicio (/#...) no se marcan como página activa
// Las secciones del inicio (/servicios, etc.) no se marcan como activas: son posiciones dentro de una página
const isActive = (link: string) => !sectionForPath(link) && route.path === link
const isOpen = ref(false)
const scrolled = ref(false)

const closeMenu = () => {
  isOpen.value = false
}

const onResize = () => {
  if (window.innerWidth > DESKTOP_BREAKPOINT) closeMenu()
}
const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}

// Evita que la página se desplace detrás del menú móvil abierto
watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ink);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.site-header.scrolled {
  border-bottom-color: var(--line-dark);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

.brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.brand img {
  height: 44px;
  width: auto;
  display: block;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav ul {
  display: flex;
  gap: 26px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--muted-dark);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
}

.nav-link.active {
  border-bottom-color: var(--ice);
}

.nav-cta {
  min-height: 42px;
  padding: 10px 18px;
  font-size: 0.95rem;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius-md);
  cursor: pointer;
}

/* Ícono de dos líneas que se convierte en X */
.toggle-lines,
.toggle-lines::before {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.2s ease;
}

.toggle-lines {
  position: relative;
  transform: translateY(-4px);
}

.toggle-lines::before {
  content: '';
  position: absolute;
  top: 8px;
}

.toggle-lines.open {
  transform: translateY(0) rotate(45deg);
}

.toggle-lines.open::before {
  transform: translateY(-8px) rotate(-90deg);
}

@media (max-width: 980px) {
  .menu-toggle {
    display: inline-flex;
  }

  .nav {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    padding: 24px var(--gutter) 40px;
    background: var(--ink);
    border-top: 1px solid var(--line-dark);
    overflow-y: auto;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s;
  }

  .nav.open {
    visibility: visible;
    opacity: 1;
    transform: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .nav ul {
    flex-direction: column;
    gap: 0;
  }

  .nav-link {
    display: block;
    padding: 16px 0;
    font-size: 1.15rem;
    color: #ffffff;
    border-bottom: 1px solid var(--line-dark);
  }

  .nav-link.active {
    border-bottom-color: var(--line-dark);
    color: var(--ice);
  }

  .nav-cta {
    min-height: 52px;
    font-size: 1rem;
  }
}
</style>
