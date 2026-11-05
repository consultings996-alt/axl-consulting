import { createRouter, type RouterHistory, type RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import ServicesPage from "@/views/ServicesPage.vue";
import ProcessPage from "@/views/ProcessPage.vue";
import ProfilesPage from "@/views/ProfilesPage.vue";
import QuotePage from "@/views/QuotePage.vue";
import About from "@/views/About.vue";
import Projects from "@/views/Projects.vue";
import Insights from "@/views/Insights.vue";
import Careers from "@/views/Careers.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import Terms from "@/views/Terms.vue";
import NotFound from "@/views/NotFound.vue";
import { hasProjects } from "@/data/projects";
import { pages } from "@/data/pages";

// Las vistas se importan directamente (no lazy): el sitio es pequeño y así
// cada página prerenderizada trae su CSS desde el inicio, sin parpadeos.
const routes: RouteRecordRaw[] = [
    { path: "/", name: "Home", component: Home },
    { path: pages.servicios, name: "Services", component: ServicesPage },
    { path: pages.comoTrabajamos, name: "Process", component: ProcessPage },
    { path: pages.perfiles, name: "Profiles", component: ProfilesPage },
    { path: pages.cotizar, name: "Quote", component: QuotePage },
    { path: "/about", name: "About", component: About },
    {
        path: "/projects",
        name: "Projects",
        component: Projects,
        // Sin proyectos publicados, la página no se muestra
        beforeEnter: () => (hasProjects ? true : pages.comoTrabajamos)
    },
    // Contacto y Cotizar eran la misma página (formulario + datos de contacto)
    { path: "/contact", redirect: pages.cotizar },
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
    { path: pages.servicios, sitemap: true },
    { path: pages.comoTrabajamos, sitemap: true },
    { path: pages.perfiles, sitemap: true },
    { path: pages.cotizar, sitemap: true },
    { path: "/about", sitemap: true },
    ...(hasProjects ? [{ path: "/projects", sitemap: true }] : []),
    { path: "/insights", sitemap: true },
    { path: "/careers", sitemap: true },
    { path: "/privacy", sitemap: false },
    { path: "/terms", sitemap: false }
]

/** Espacio para que el encabezado fijo no tape el destino de un enlace con #: su alto real */
export const headerOffset = () => document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 72

/** Desplazamiento suave, salvo que el usuario pidió reducir animaciones */
export const scrollMode = (smooth: boolean): ScrollBehavior =>
    smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto"

/** Crea el router; el historial cambia entre navegador (cliente) y memoria (prerender) */
export function createAppRouter(history: RouterHistory) {
    return createRouter({
        history,
        routes,
        scrollBehavior(to, _from, savedPosition) {
            if (savedPosition) return savedPosition
            if (to.hash) return { el: to.hash, top: headerOffset(), behavior: scrollMode(true) }
            return { top: 0 }
        }
    })
}
