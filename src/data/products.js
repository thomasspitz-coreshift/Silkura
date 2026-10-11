/* ============================================================
   Catalogue Silkura — 100 % inox.

   ⚠ CATALOGUE D'EXEMPLE : noms, tailles, prix et caractéristiques sont provisoires.
   Les remplacer par la vraie gamme avant la mise en ligne.

   Champs d'une pièce :
     slug        adresse de la page (/produit/<slug>), en minuscules et tirets
     category    identifiant d'une catégorie ci-dessous
     shape       silhouette de l'illustration de secours (si aucune photo)
     tone        fond derrière la photo ou l'illustration : 'sand' | 'stone' | 'clay' | 'linen'
     images      photos (la première est la photo principale), ex. ['/images/produits/poele-1.webp'] ;
                 format 3:2 conseillé. Visuels actuels générés par IA d'après le packaging :
                 à remplacer par les vraies photos produit avant la vente.
     sizes       déclinaisons ; price en euros TTC ; buyUrl = lien de paiement (Stripe, Shopify…)
                 si buyUrl est vide, le bouton mène au formulaire de contact pré-rempli.
   ============================================================ */

export const categories = [
  {
    id: 'poeles',
    label: 'Poêles',
    title: 'Poêles',
    intro: "Saisir, dorer, déglacer. Des poêles en inox qui répartissent la chaleur jusqu'aux bords et la gardent stable.",
    shape: 'poele',
  },
  {
    id: 'sauteuses',
    label: 'Sauteuses & woks',
    title: 'Sauteuses et woks',
    intro: 'Des bords hauts pour remuer, mijoter, faire sauter. Les pièces à tout faire du quotidien.',
    shape: 'sauteuse',
  },
  {
    id: 'casseroles',
    label: 'Casseroles',
    title: 'Casseroles',
    intro: 'Sauces, riz, légumes, crèmes. Une chaleur qui monte le long des parois, pour cuire sans surveiller chaque seconde.',
    shape: 'casserole',
  },
  {
    id: 'faitouts',
    label: 'Faitouts',
    title: 'Faitouts',
    intro: 'Bouillons, pâtes, ragoûts, confitures. Du volume, un fond épais, et des poignées pensées pour être portées pleines.',
    shape: 'faitout',
  },
  {
    id: 'coffrets',
    label: 'Coffrets',
    title: 'Coffrets',
    intro: "Les pièces essentielles réunies, pour équiper une cuisine d'un coup, ou pour offrir.",
    shape: 'sauteuse',
  },
]

// Ce qui rend l'inox Silkura différent : repris sur l'accueil et le savoir-faire.
export const inoxFacts = [
  { value: '3', unit: 'couches', text: "Inox 18/10 à l'intérieur, cœur d'aluminium, inox magnétique à l'extérieur, soudés sur toute la hauteur." },
  { value: '0', unit: 'revêtement', text: "Ni PTFE, ni PFAS, rien qui s'use ou s'écaille. La surface de cuisson, c'est le métal lui-même." },
  { value: '260', unit: '°C', text: 'Au four comme sur le feu, couvercles compris. Tous feux, induction comprise.' },
  { value: 'À vie', unit: '', text: "L'inox ne rouille pas, ne réagit pas aux aliments acides et passe au lave-vaisselle." },
]

const SPECS_BASE = [
  ['Matière', 'Inox 18/10 · aluminium · inox ferritique'],
  ['Construction', '3 plis sur toute la hauteur'],
  ['Poignées', 'Rivetées, finition cuivre rosé'],
  ['Fabrication', 'France'],
  ['Feux', 'Tous feux, induction comprise'],
  ['Four', "Jusqu'à 260 °C"],
  ['Lave-vaisselle', 'Oui'],
]

export const products = [
  {
    slug: 'poele-inox',
    name: 'La Poêle',
    category: 'poeles',
    shape: 'poele',
    tone: 'sand',
    badge: 'La signature',
    tagline: "Celle qu'on sort tous les jours. Et pour toute une vie.",
    description:
      "Trois couches soudées sur toute la hauteur : la chaleur monte vite, se répartit jusqu'aux bords et reste stable quand on ajoute les aliments. Sa surface en inox poli saisit franchement et laisse des sucs parfaits pour déglacer.",
    features: [
      'Inox 3 plis, cœur aluminium sur toute la hauteur',
      'Bords évasés et verseurs, sans goutte',
      'Queue rivetée, finition cuivre rosé',
      'Passe au four et au lave-vaisselle',
    ],
    sizes: [
      { label: '20 cm', price: 69, buyUrl: '' },
      { label: '24 cm', price: 79, buyUrl: '' },
      { label: '28 cm', price: 95, buyUrl: '' },
      { label: '32 cm', price: 115, buyUrl: '' },
    ],
    specs: [...SPECS_BASE, ['Épaisseur', '2,6 mm'], ['Poids (28 cm)', '1,4 kg']],
    images: ['/images/produits/poele-1.webp', '/images/produits/poele-2.webp', '/images/atelier/detail.webp'],
  },
  {
    slug: 'sauteuse-inox',
    name: 'La Sauteuse',
    category: 'sauteuses',
    shape: 'sauteuse',
    tone: 'sand',
    tagline: 'Saisir, déglacer, mijoter. Dans le même ustensile.',
    description:
      "Des bords droits de 7 cm pour remuer sans déborder, une poignée d'appoint pour la porter pleine, un couvercle ajusté pour finir les cuissons à l'étouffée. La pièce à tout faire.",
    features: [
      'Bords droits de 7 cm',
      'Queue et poignée d\'appoint rivetées, finition cuivre rosé',
      'Couvercle inox gravé Silkura, fourni',
      'Passe au four et au lave-vaisselle',
    ],
    sizes: [
      { label: '24 cm · 3 L', price: 119, buyUrl: '' },
      { label: '28 cm · 4,2 L', price: 139, buyUrl: '' },
    ],
    specs: [...SPECS_BASE, ['Couvercle', 'Inox, fourni']],
    images: ['/images/produits/sauteuse-1.webp', '/images/produits/sauteuse-2.webp'],
  },
  {
    slug: 'wok-inox',
    name: 'Le Wok',
    category: 'sauteuses',
    shape: 'wok',
    tone: 'stone',
    tagline: 'Feu vif, gestes rapides.',
    description:
      "Un fond plat pour tenir sur l'induction, des parois évasées pour faire sauter, une réactivité immédiate grâce au cœur d'aluminium. Pour les sautés qui se jouent en deux minutes.",
    features: [
      "Fond plat de 14 cm, stable sur l'induction",
      'Parois évasées, faciles à remuer',
      'Queue et poignée d\'appoint rivetées, finition cuivre rosé',
      'Passe au four et au lave-vaisselle',
    ],
    sizes: [{ label: '30 cm · 4,5 L', price: 129, buyUrl: '' }],
    specs: [...SPECS_BASE, ['Poids', '1,6 kg']],
    images: ['/images/produits/wok-1.webp', '/images/produits/wok-2.webp'],
  },
  {
    slug: 'casserole-inox',
    name: 'La Casserole',
    category: 'casseroles',
    shape: 'casserole',
    tone: 'stone',
    badge: 'Nouveau',
    tagline: 'Pour les sauces qui ne pardonnent rien.',
    description:
      "Graduée à l'intérieur, dotée de bords verseurs et d'un couvercle ajusté. La chaleur monte le long des parois : les sauces réduisent sans attacher au fond.",
    features: [
      "Graduations gravées à l'intérieur",
      'Couvercle inox gravé Silkura, fourni',
      'Queue rivetée, finition cuivre rosé',
      'Passe au four et au lave-vaisselle',
    ],
    sizes: [
      { label: '16 cm · 1,5 L', price: 79, buyUrl: '' },
      { label: '18 cm · 2 L', price: 89, buyUrl: '' },
      { label: '20 cm · 3 L', price: 99, buyUrl: '' },
    ],
    specs: [...SPECS_BASE, ['Couvercle', 'Inox, fourni']],
    images: ['/images/produits/casserole-1.webp', '/images/produits/casserole-2.webp'],
  },
  {
    slug: 'faitout-inox',
    name: 'Le Faitout',
    category: 'faitouts',
    shape: 'faitout',
    tone: 'clay',
    tagline: "Le grand volume, sans le poids d'une fonte.",
    description:
      "Pour les bouillons du dimanche, les pâtes pour dix ou les confitures de saison. Deux poignées larges, pensées pour être saisies avec des maniques, et un couvercle qui garde la vapeur.",
    features: [
      'Deux poignées larges rivetées, finition cuivre rosé',
      "Graduations gravées à l'intérieur",
      'Couvercle inox gravé Silkura, fourni',
      'Passe au four et au lave-vaisselle',
    ],
    sizes: [
      { label: '24 cm · 6 L', price: 149, buyUrl: '' },
      { label: '28 cm · 9 L', price: 175, buyUrl: '' },
    ],
    specs: [...SPECS_BASE, ['Couvercle', 'Inox, fourni']],
    images: ['/images/produits/faitout-1.webp', '/images/produits/faitout-2.webp'],
  },
  {
    slug: 'coffret-essentiel',
    name: "Le Coffret de l'essentiel",
    category: 'coffrets',
    shape: 'faitout',
    tone: 'linen',
    badge: 'À offrir',
    tagline: 'Trois pièces pour tout cuisiner.',
    description:
      "Le Faitout 24 cm et son couvercle, la Poêle 24 cm et la Poêle 28 cm. De quoi saisir, mijoter et recevoir, réunis dans le coffret bleu nuit Silkura, prêt à offrir.",
    features: [
      'Le Faitout 24 cm avec couvercle gravé',
      'La Poêle 24 cm',
      'La Poêle 28 cm',
      'Coffret bleu nuit en carton recyclé, prêt à offrir',
    ],
    sizes: [{ label: '3 pièces', price: 279, buyUrl: '' }],
    specs: [...SPECS_BASE, ['Contenu', 'Faitout 24 cm, poêles 24 et 28 cm']],
    images: ['/images/marque/coffret-trio.webp'],
  },
]

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}

export function getCategory(id) {
  return categories.find((c) => c.id === id)
}

export function productsIn(categoryId) {
  return products.filter((p) => p.category === categoryId)
}

export function priceFrom(product) {
  return Math.min(...product.sizes.map((s) => s.price))
}

// Formatage manuel plutôt qu'Intl : le HTML pré-rendu (Node) et le navigateur doivent produire
// exactement la même chaîne, sinon React signale une différence à l'hydratation.
export function formatPrice(value) {
  const [int, dec] = value.toFixed(2).split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return dec === '00' ? `${grouped} €` : `${grouped},${dec} €`
}
