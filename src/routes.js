import { categories, products } from './data/products'

/* Pages pré-rendues en HTML statique (et listées dans le sitemap).
   Une page absente d'ici fonctionne en navigation interne, mais n'existe pas pour Google
   ni en accès direct (404) : toute nouvelle page doit y être ajoutée. */
export function getRoutes() {
  return [
    '/',
    '/collection',
    ...categories.map((c) => `/collection/${c.id}`),
    ...products.map((p) => `/produit/${p.slug}`),
    '/savoir-faire',
    '/entretien',
    '/faq',
    '/contact',
    '/mentions-legales',
    '/cgv',
    '/confidentialite',
  ]
}
