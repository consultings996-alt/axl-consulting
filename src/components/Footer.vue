<template>
  <footer class="footer on-dark">
    <div class="container">
      <div class="grid">
        <div class="brand">
          <img :src="logo" alt="A.X.L – Advanced eXponential Logic" width="122" height="48" />
          <p>Desarrollo de software a medida, integraciones y automatización para empresas en México.</p>
          <ul class="social">
            <li v-for="link in footerSocial" :key="link.id">
              <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav">Navegación</h2>
          <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li v-for="item in menu" :key="item.label">
              <router-link :to="item.link">{{ item.label }}</router-link>
            </li>
            <li><router-link to="/contact">Contacto</router-link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services">Servicios</h2>
          <ul>
            <li v-for="service in services" :key="service.id">
              <router-link :to="quoteLink(service.slug)">{{ service.shortTitle }}</router-link>
            </li>
          </ul>
        </nav>

        <div>
          <h2>Contacto</h2>
          <ul>
            <li><a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
            <li><a :href="company.phone.href">{{ company.phone.display }}</a></li>
            <li class="plain">{{ company.location }}</li>
          </ul>
        </div>
      </div>

      <div class="bottom">
        <p>&copy; {{ year }} {{ company.legalName }}</p>
        <ul>
          <li><router-link to="/privacy">Aviso de privacidad</router-link></li>
          <li><router-link to="/terms">Términos y condiciones</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { quoteLink } from '@/data/sections'
import { company, socialLinks } from '@/data/company'
import services from '@/data/services'
import menu from '@/data/menu'
import logo from '@/assets/brand/logo-axl.webp'

const footerSocial = socialLinks.filter((s) => s.id !== 'whatsapp')
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #06111f;
  color: var(--muted-dark);
  padding: clamp(64px, 8vw, 96px) 0 32px;
  font-size: 0.95rem;
}

.grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.1fr 1.2fr;
  gap: 48px 40px;
  padding-bottom: 56px;
}

.brand img {
  height: 44px;
  width: auto;
  display: block;
  margin-bottom: 20px;
}

.brand p {
  margin: 0 0 24px;
  max-width: 34ch;
  line-height: 1.6;
}

h2 {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0;
  color: #ffffff;
  margin-bottom: 18px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

a {
  color: var(--muted-dark);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--ice);
}

.social {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.social a {
  display: inline-block;
  padding: 6px 14px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius-pill);
}

.social a:hover {
  border-color: var(--ice);
}

.bottom {
  padding-top: 28px;
  border-top: 1px solid var(--line-dark);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  font-size: var(--text-sm);
}

.bottom p {
  margin: 0;
}

.bottom ul {
  display: flex;
  gap: 24px;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
