import { createRouter, type RouterHistory, type RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Projects from "@/views/Projects.vue";
import Contact from "@/views/Contact.vue";
import Insights from "@/views/Insights.vue";
import Careers from "@/views/Careers.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import Terms from "@/views/Terms.vue";
import NotFound from "@/views/NotFound.vue";
import { hasProjects } from "@/data/projects";
import { homeSections, sectionForPath } from "@/data/sections";

// Las vistas se importan directamente (no lazy): el sitio es pequeño y así
// cada página prerenderizada trae su CSS desde el inicio, sin parpadeos.
const routes: RouteRecordRaw[] = [
    { path: "/", name: "Home", component: Home },
    // URLs limpias para las secciones del inicio: muestran la misma página y bajan a la sección
    ...Object.values(homeSections).map((section) => ({
        path: section.path,
        name: `Home:${section.id}`,
        component: Home
    })),
    { path: "/about", name: "About", component: About },
    {
        path: "/projects",
        name: "Projects",
        component: Projects,
        // Sin proyectos publicados, la página no se muestra
        beforeEnter: () => (hasProjects ? true : homeSections.comoTrabajamos.path)
    },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/insights", name: "Insights", component: Insights },
    { path: "/careers", name: "Careers", component: Careers },
    // La página de Medios aún no tiene contenido; se redirige mientras tanto.
    { path: "/media", redirect: "/insights" },
    { path: "/privacy", name: "Privacy", component: PrivacyPolicy },
    { path: "/terms", name: "Terms", component: Terms },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
]

/** Páginas que se generan como HTML estático en el build (prerender) */
export const prerenderRoutes: { path: string; sitemap: boolean }[] = [
    { path: "/", sitemap: true },
    // Se generan para que funcionen al abrirlas directo, pero no van al sitemap:
    // para Google son la misma página que "/" (su canonical apunta ahí)
    ...Object.values(homeSections).map((section) => ({ path: section.path, sitemap: false })),
    { path: "/about", sitemap: true },
    ...(hasProjects ? [{ path: "/projects", sitemap: true }] : []),
    { path: "/contact", sitemap: true },
    { path: "/insights", sitemap: true },
    { path: "/careers", sitemap: true },
    { path: "/privacy", sitemap: false },
    { path: "/terms", sitemap: false }
]

/** Espacio para que el encabezado fijo no tape el título de la sección */
export const SCROLL_OFFSET = 120

/** Desplazamiento suave, salvo que el usuario pidió reducir animaciones */
export const scrollMode = (smooth: boolean): ScrollBehavior =>
    smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto"

/** Crea el router; el historial cambia entre navegador (cliente) y memoria (prerender) */
export function createAppRouter(history: RouterHistory) {
    return createRouter({
        history,
        routes,
        async scrollBehavior(to, from, savedPosition) {
            if (savedPosition) return savedPosition
            const section = sectionForPath(to.path)
            if (section) {
                // Al abrir la URL directo, espera a las fuentes para que el texto no mueva la posición
                if (from.matched.length === 0) await document.fonts?.ready
                // Desplazamiento suave si ya estamos en el inicio; directo si venimos de otra página
                const fromHome = from.matched[0]?.components?.default === Home
                return { el: `#${section.id}`, top: SCROLL_OFFSET, behavior: scrollMode(fromHome) }
            }
            if (to.hash) return { el: to.hash, top: SCROLL_OFFSET, behavior: scrollMode(true) }
            return { top: 0 }
        }
    })
}
