/* ============================================================
   Balises <head> par page (titre, description, partage, données structurées).

   - Au pré-rendu (scripts/prerender.mjs), <Seo> remplit le collecteur fourni par
     HeadContext ; renderHead() en fait du HTML injecté dans la page statique.
   - Dans le navigateur, <Seo> met à jour les mêmes balises à chaque navigation.
   Les balises gérées portent l'attribut data-head pour être retrouvées.
   ============================================================ */

import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '@/data/site'

export const HeadContext = createContext(null)

function absolute(url) {
  if (!url) return undefined
  return /^https?:\/\//.test(url) ? url : site.url + url
}

export function buildHead({ title, description, image, type = 'website', jsonLd, noindex, pathname }) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`
  const canonical = site.url + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))
  return {
    title: fullTitle,
    description: description || site.description,
    canonical,
    image: absolute(image || site.ogImage),
    type,
    jsonLd,
    noindex: Boolean(noindex) || !site.indexable,
  }
}

export function Seo(props) {
  const { pathname } = useLocation()
  const collector = useContext(HeadContext)
  const head = buildHead({ ...props, pathname })

  // Pré-rendu uniquement : le collecteur n'existe pas dans le navigateur.
  if (collector) Object.assign(collector, head)

  const jsonLdString = head.jsonLd ? JSON.stringify(head.jsonLd) : ''
  useEffect(() => {
    applyHead(head, jsonLdString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [head.title, head.description, head.canonical, head.image, head.type, head.noindex, jsonLdString])

  return null
}

function metaTags(head) {
  const tags = [
    ['meta', { name: 'description', content: head.description }],
    ['meta', { property: 'og:site_name', content: site.name }],
    ['meta', { property: 'og:locale', content: site.locale }],
    ['meta', { property: 'og:type', content: head.type }],
    ['meta', { property: 'og:title', content: head.title }],
    ['meta', { property: 'og:description', content: head.description }],
    ['meta', { property: 'og:url', content: head.canonical }],
    ['meta', { property: 'og:image', content: head.image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'canonical', href: head.canonical }],
  ]
  if (head.noindex) tags.push(['meta', { name: 'robots', content: 'noindex' }])
  return tags
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// JSON dans une balise <script> : « < » échappé pour qu'aucune valeur ne puisse fermer la balise.
function safeJson(json) {
  return json.replace(/</g, '\\u003c')
}

export function renderHead(head) {
  const lines = [`<title>${escapeText(head.title)}</title>`]
  for (const [tag, attrs] of metaTags(head)) {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')
    lines.push(`<${tag} data-head ${a} />`)
  }
  if (head.jsonLd) {
    lines.push(`<script data-head type="application/ld+json">${safeJson(JSON.stringify(head.jsonLd))}</script>`)
  }
  return lines.join('\n    ')
}

function applyHead(head, jsonLdString) {
  document.title = head.title
  document.head.querySelectorAll('[data-head]').forEach((el) => el.remove())
  for (const [tag, attrs] of metaTags(head)) {
    const el = document.createElement(tag)
    el.setAttribute('data-head', '')
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    document.head.appendChild(el)
  }
  if (jsonLdString) {
    const script = document.createElement('script')
    script.setAttribute('data-head', '')
    script.type = 'application/ld+json'
    script.textContent = jsonLdString
    document.head.appendChild(script)
  }
}
