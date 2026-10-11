/* ============================================================
   Pré-rendu : transforme chaque adresse de src/routes.js en page HTML statique.
   Lancé par `npm run build` après les deux builds Vite (client → dist/, serveur → dist-ssr/).
   Produit aussi 404.html, sitemap.xml et robots.txt.
   ============================================================ */

import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html : marqueurs <!--app-head--> ou <!--app-html--> introuvables.')
}

const { render, getRoutes, site } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

// Préchargement des deux polices visibles dès le premier écran (titres et texte, alphabet latin) :
// évite le saut de typographie au chargement.
const assets = await fs.readdir(path.join(dist, 'assets'))
const preloadFonts = [/^eb-garamond-latin-400-normal-.*\.woff2$/, /^geist-latin-wght-normal-.*\.woff2$/]
  .map((pattern) => assets.find((f) => pattern.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

function page(url) {
  const { html, head } = render(url)
  if (!html) throw new Error(`Rendu vide pour ${url}`)
  return template.replace('<!--app-head-->', `${preloadFonts}\n    ${head}`).replace('<!--app-html-->', html)
}

// /collection → collection.html, /produit/x → produit/x.html : Netlify sert ces fichiers à l'adresse
// sans extension ni barre finale (pas de redirection), et /collection/poeles peut coexister avec /collection.
function outputFile(url) {
  return url === '/' ? path.join(dist, 'index.html') : path.join(dist, `${url}.html`)
}

const routes = getRoutes()
for (const url of routes) {
  const file = outputFile(url)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page(url))
}

// Page 404 servie par Netlify pour toute adresse inconnue.
await fs.writeFile(path.join(dist, '404.html'), page('/404'))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${site.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)

await fs.rm(ssrDir, { recursive: true, force: true })
console.log(`✓ ${routes.length} pages pré-rendues + 404, sitemap.xml, robots.txt`)
