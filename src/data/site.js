/* ============================================================
   Informations de la marque — source unique pour tout le site.
   Tout ce qui est marqué « À CONFIRMER » est un texte provisoire :
   à valider avec Silkura avant la mise en ligne.
   ============================================================ */

export const site = {
  name: 'Silkura',
  // À CONFIRMER : nom de domaine définitif (sert aux liens canoniques, au sitemap, aux partages).
  url: 'https://www.silkura.fr',
  tagline: 'Ustensiles de cuisson en inox',
  description:
    "Silkura, ustensiles de cuisson en inox 3 plis fabriqués en France : poêles, sauteuses, casseroles et faitouts sans revêtement, compatibles tous feux, garantis à vie.",
  ogImage: '/og-image.jpg',
  // Pré-lancement : false = moteurs de recherche tenus à l'écart (balise noindex + robots.txt « Disallow »).
  // Passer à true le jour de la mise en ligne, sinon le site n'apparaîtra jamais dans Google.
  indexable: false,
  locale: 'fr_FR',

  // À CONFIRMER : coordonnées et réseaux.
  email: 'bonjour@silkura.fr',
  instagram: 'https://www.instagram.com/silkura',
  instagramHandle: '@silkura',

  // Photos d'ambiance : null = une illustration prend le relais.
  media: {
    hero: '/images/marque/collection-complete.webp',
    packaging: '/images/marque/packaging.webp',
    // Visuels générés par IA (ElevenLabs) d'après la DA du packaging, en attendant un shooting.
    atelier: '/images/atelier/polissage.webp',
    detail: '/images/atelier/detail.webp',
    cuisine: '/images/ambiance/cuisine.webp',
    entretien: '/images/ambiance/goutte.webp',
  },
}

// Conditions commerciales, reprises sur les fiches produit, la FAQ et les CGV. À CONFIRMER.
export const commerce = {
  freeShippingFrom: 80,        // € TTC
  shippingDelay: '48 h ouvrées',
  deliveryTime: '2 à 4 jours ouvrés',
  returnDays: 30,              // le minimum légal est de 14 jours
}

// Promesses affichées en bandeau. À CONFIRMER une par une : ce sont des engagements commerciaux.
export const promises = [
  'Fabriqué en France',
  'Compatibles tous feux, induction comprise',
  'Sans revêtement antiadhésif, sans PFAS',
  'Garantie à vie',
  `Livraison offerte dès ${commerce.freeShippingFrom}\u00A0€`,
  `Retours sous ${commerce.returnDays} jours`,
]

export const nav = [
  { to: '/collection', label: 'Collection' },
  { to: '/savoir-faire', label: 'Savoir-faire' },
  { to: '/entretien', label: 'Entretien' },
  { to: '/faq', label: 'Questions' },
]

export const legalNav = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/cgv', label: 'Conditions de vente' },
  { to: '/confidentialite', label: 'Confidentialité' },
]
