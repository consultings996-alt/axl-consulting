/**
 * Prerender: genera un HTML estático por página después del build.
 * Así Google y las redes sociales leen el contenido sin ejecutar JavaScript,
 * y la página se ve al instante; después Vue "hidrata" ese HTML.
 *
 * Además crea 404.html, sitemap.xml y robots.txt.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

let template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

// Precarga la fuente de los títulos para que el texto principal no "salte" al cargar
const assets = await fs.readdir(path.join(dist, 'assets'))
const headingFont = assets.find((f) => /^sora-latin-wght-normal-.*\.woff2$/.test(f))
if (headingFont) {
  template = template.replace(
    '</head>',
    `  <link rel="preload" href="/assets/${headingFont}" as="font" type="font/woff2" crossorigin>\n  </head>`
  )
}
const { render, prerenderRoutes, SITE_URL, hasProjects } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

/** "/" → index.html, "/about" → about.html (Vercel sirve /about con cleanUrls) */
const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`)

for (const { path: route } of prerenderRoutes) {
  const html = await render(route, template)
  const file = path.join(dist, fileFor(route))
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, html)
  console.log(`  prerender  ${route.padEnd(12)} → dist/${fileFor(route)}`)
}

// Página 404 (Vercel la usa automáticamente para rutas inexistentes)
await fs.writeFile(path.join(dist, '404.html'), await render('/pagina-no-encontrada', template))
console.log('  prerender  404          → dist/404.html')

// Mientras no haya proyectos publicados, /projects redirige a "Cómo trabajamos"
if (!hasProjects) {
  await fs.writeFile(
    path.join(dist, 'projects.html'),
    `<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="robots" content="noindex">` +
      `<meta http-equiv="refresh" content="0; url=/como-trabajamos"><link rel="canonical" href="${SITE_URL}/">` +
      `<title>A.X.L</title></head><body><a href="/como-trabajamos">Ir a A.X.L</a></body></html>\n`
  )
  console.log('  redirect   /projects    → /como-trabajamos (sin proyectos aún)')
}

const today = new Date().toISOString().slice(0, 10)
const urls = prerenderRoutes
  .filter((r) => r.sitemap)
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`  sitemap.xml y robots.txt para ${SITE_URL}`)

await fs.rm(ssrDir, { recursive: true, force: true })
