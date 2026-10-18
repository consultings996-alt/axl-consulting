import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { sectionForPath } from '@/data/sections'
import { SCROLL_OFFSET, scrollMode } from '@/router'

/**
 * Si ya estás en /servicios, bajaste y vuelves a dar clic en "Servicios",
 * el router no navega (es la misma URL). Esto vuelve a llevarte a la sección.
 */
export function useSectionReclick() {
  const router = useRouter()

  const onClick = (event: MouseEvent) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = (event.target as Element | null)?.closest('a')
    if (!link || link.target === '_blank') return

    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin) return
    if (url.pathname + url.search !== router.currentRoute.value.fullPath) return

    const section = sectionForPath(url.pathname)
    const target = section && document.getElementById(section.id)
    if (!target) return

    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top, behavior: scrollMode(true) })
  }

  onMounted(() => document.addEventListener('click', onClick))
  onUnmounted(() => document.removeEventListener('click', onClick))
}
