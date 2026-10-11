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
    "Silkura dessine des poêles, sauteuses, casseroles et faitouts en inox 3 plis, sobres et durables. Sans revêtement, compatibles tous feux dont induction.",
  ogImage: '/og-image.jpg',
  locale: 'fr_FR',

  // À CONFIRMER : coordonnées et réseaux.
  email: 'bonjour@silkura.fr',
  instagram: 'https://www.instagram.com/silkura',
  instagramHandle: '@silkura',

  // Photos d'ambiance : laisser vide tant qu'elles n'existent pas (une illustration prend le relais).
  media: {
    hero: null,          // ex. '/images/hero/accueil.jpg'
    atelier: null,       // ex. '/images/atelier/mains.jpg'
    cuisine: null,       // ex. '/images/ambiance/cuisine.jpg'
    entretien: null,     // ex. '/images/ambiance/goutte.jpg'
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
  'Compatibles tous feux, induction comprise',
  'Sans revêtement antiadhésif, sans PFAS',
  'Inox 3 plis, garanti à vie',
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
