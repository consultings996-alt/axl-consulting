<template>
  <footer class="footer on-dark">
    <div class="container">
      <!-- Franja principal: marca a la izquierda, contacto y redes a la derecha -->
      <div class="main">
        <div class="brand">
          <router-link to="/" class="home-link" aria-label="A.X.L – Ir al inicio">
            <img :src="logo" alt="" width="122" height="48" />
          </router-link>
          <p>Desarrollo de software a medida, integraciones y automatización para empresas en México.</p>
        </div>

        <div class="reach">
          <h2 class="visually-hidden">Contacto</h2>
          <ul class="contact">
            <li><a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
            <li><a :href="company.phone.href">{{ company.phone.display }}</a></li>
            <li><a :href="whatsapp.url" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li class="plain">{{ company.location }}</li>
          </ul>
          <ul class="social" aria-label="Redes sociales">
            <li v-for="link in footerSocial" :key="link.id">
              <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </li>
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
import { company, social, socialLinks } from '@/data/company'
import logo from '@/assets/brand/logo-axl.webp'

const footerSocial = socialLinks.filter((s) => s.id !== 'whatsapp')
const whatsapp = social('whatsapp')
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #06111f;
  color: var(--muted-dark);
  padding: clamp(40px, 5vw, 56px) 0 24px;
  font-size: 0.95rem;
}

.main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px 48px;
  padding-bottom: clamp(28px, 4vw, 40px);
}

/* Marca: logo y descripción en la misma línea */
.brand {
  display: flex;
  align-items: center;
  gap: 24px;
}

.home-link {
  display: inline-block;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
}

.brand img {
  height: 44px;
  width: auto;
  display: block;
}

.brand p {
  margin: 0;
  max-width: 36ch;
  line-height: 1.55;
  padding-left: 24px;
  border-left: 1px solid var(--line-dark);
}

/* Contacto y redes, alineados a la derecha */
.reach {
  display: grid;
  justify-items: end;
  gap: 14px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px 24px;
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
  padding: 5px 14px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius-pill);
  font-size: var(--text-sm);
}

.social a:hover {
  border-color: var(--ice);
}

.bottom {
  padding-top: 20px;
  border-top: 1px solid var(--line-dark);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 24px;
  font-size: var(--text-sm);
}

.bottom p {
  margin: 0;
}

.bottom ul {
  display: flex;
  gap: 24px;
}

/* Tablet y celular: todo apilado y alineado a la izquierda */
@media (max-width: 900px) {
  .main {
    flex-direction: column;
    align-items: flex-start;
  }

  .reach {
    justify-items: start;
  }

  .contact {
    justify-content: flex-start;
  }
}

@media (max-width: 560px) {
  .brand {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .brand p {
    padding-left: 0;
    border-left: 0;
  }

  .contact {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
