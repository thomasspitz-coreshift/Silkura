/* ============================================================
   Contrôle du site généré (npm run check) :
     - chaque lien interne mène à une page ou un fichier existant ;
     - chaque page a un titre, une description et un seul <h1> ;
     - signale les textes « À COMPLÉTER » restants (bloquant uniquement avec --strict,
       à utiliser avant la mise en ligne).
   ============================================================ */

import fs from 'node:fs/promises'
import path from 'node:path'

const dist = path.join(process.cwd(), 'dist')
const strict = process.argv.includes('--strict')

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])))
  return files.flat()
}

async function exists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

async function resolves(href) {
  const clean = decodeURIComponent(href.split(/[?#]/)[0])
  if (clean === '/' || clean === '') return exists(path.join(dist, 'index.html'))
  const target = path.join(dist, clean)
  if (await exists(`${target}.html`)) return true
  return (await exists(target)) && !(await fs.stat(target)).isDirectory()
}

const pages = (await walk(dist)).filter((f) => f.endsWith('.html'))
const errors = []
const todos = []

for (const file of pages) {
  const rel = '/' + path.relative(dist, file)
  const html = await fs.readFile(file, 'utf8')

  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel} : <title> manquant`)
  if (!/<meta data-head name="description" content="[^"]+"/.test(html)) errors.push(`${rel} : description manquante`)
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) errors.push(`${rel} : ${h1} balises <h1> (1 attendue)`)

  const ogImage = html.match(/property="og:image" content="https?:\/\/[^/"]+(\/[^"]*)"/)
  if (ogImage && !(await resolves(ogImage[1]))) errors.push(`${rel} : image de partage introuvable → ${ogImage[1]}`)

  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue
    if (!(await resolves(href))) errors.push(`${rel} : lien cassé → ${href}`)
  }

  const count = (html.match(/À COMPLÉTER/g) || []).length
  if (count) todos.push(`${rel} : ${count} mention(s) « À COMPLÉTER »`)
}

const robots = await fs.readFile(path.join(dist, 'robots.txt'), 'utf8')
if (/Disallow: \/\s*$/m.test(robots)) {
  console.log(`\n${strict ? '✗' : '!'} Site en pré-lancement : non indexable (site.indexable = false dans src/data/site.js).`)
  if (strict) errors.push('Le site est encore fermé aux moteurs de recherche (site.indexable = false).')
}

if (todos.length) {
  console.log(`\n${strict ? '✗' : '!'} Textes à compléter avant la mise en ligne :`)
  todos.forEach((t) => console.log('  ' + t))
  if (strict) errors.push('Des textes « À COMPLÉTER » restent sur le site.')
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) :`)
  errors.forEach((e) => console.error('  ' + e))
  process.exit(1)
}
console.log(`\n✓ ${pages.length} pages vérifiées : liens internes, titres, descriptions, <h1>.`)
