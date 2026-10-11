# Silkura — Site de la marque (Vite + React, pré-rendu)

## Identité

- **Marque** : Silkura, ustensiles de cuisson **100 % inox 3 plis**, fabriqués en France.
  Aucune pièce en acier carbone, en fonte ou noire : ne jamais en réintroduire dans les textes ou les visuels.
- **Stack** : Vite 7 + React 19 + React Router 7 + Tailwind 4 (même base que Coreshift).
- **Hébergement** : Netlify, projet `silkura` (équipe thomas-spitz), aperçu sur https://silkura.netlify.app.
  Formulaires via Netlify Forms (détection activée sur le projet).
- **Domaine** : `https://www.silkura.fr` (à confirmer, dans `src/data/site.js`).

## Commandes

```bash
npm run dev            # développement (http://localhost:5173)
npm run build          # build client + build serveur + pré-rendu de toutes les pages dans dist/
npm run preview        # sert dist/ comme en production
npm run check          # build + contrôle : liens internes, titres, descriptions, un seul <h1>
node scripts/check-links.mjs --strict   # idem, et échoue s'il reste des « À COMPLÉTER » (avant mise en ligne)
```

## Architecture

- **Pré-rendu** (`scripts/prerender.mjs`) : chaque adresse de `src/routes.js` devient un fichier HTML statique
  (`/collection` → `dist/collection.html`, servi par Netlify sans redirection), plus `404.html`, `sitemap.xml`,
  `robots.txt`. React s'hydrate ensuite dans le navigateur (`src/main.jsx`).
  - **Toute nouvelle page** : l'ajouter dans `src/App.jsx` **et** dans `src/routes.js`.
  - Pas de redirection « /* → /index.html » : une adresse inconnue doit répondre 404.
- **Balises `<head>`** : composant `<Seo>` (`src/lib/head.jsx`) dans chaque page (titre, description, partage,
  JSON-LD). Rempli au pré-rendu, mis à jour à chaque navigation.
- **Données** (tout le contenu modifiable est là, pas dans les pages) :
  - `src/data/site.js` : coordonnées, réseaux, visuels d'ambiance, conditions commerciales, bandeau, menus.
  - `src/data/products.js` : catégories, pièces, tailles, prix, caractéristiques, photos.
- **Commande** : chaque taille a un `buyUrl` (lien Stripe Payment Link, Shopify…). Vide = le bouton
  « Commander » ouvre le formulaire de contact pré-rempli. Ajouter un prestataire de paiement = ajouter son
  domaine à la CSP de `netlify.toml`.
- **Formulaires** (`contact`, `newsletter`) : Netlify Forms, détectés dans le HTML pré-rendu. Activer les
  notifications e-mail dans l'interface Netlify (Forms → Form notifications).

## Hydratation (règles critiques)

Le HTML pré-rendu et le premier rendu navigateur doivent être identiques, sinon erreur React #418 :
- Rien qui dépende de l'heure, du hasard ou de `window` pendant le rendu (année du pied de page : `__BUILD_YEAR__`).
- Paramètres d'URL (`?sujet=…`) : lus dans un `useEffect`, jamais au premier rendu.
- Prix : `formatPrice()` (formatage manuel, pas `Intl`).
- Hooks toujours avant les `return` conditionnels.

## Immersion (accueil) — GSAP + ScrollTrigger + Lenis, comme coreshift.fr

- `src/lib/motion.js` : défilement fluide (Lenis) synchronisé avec ScrollTrigger, rien au pré-rendu.
  **Mouvement réduit** (préférence système) : pas de Lenis, chaque composant affiche un état final statique.
- **Intro** (`src/components/home/IntroSequence.jsx`) : le faitout s'ouvre au défilement. Une vidéo de 5 s
  (Kling, depuis une image Seedream) découpée en 96 images WebP dans `public/sequences/ouverture/`
  (`d/` paysage 1600×900, `m/` recadrage central pour écran vertical), dessinées dans un `<canvas>`.
  Section collante (CSS `sticky`) de 440svh. Chargement par passes (1 image sur 8, puis 4, 2, 1).
- **Gouttes** (`DropletsSection.jsx`) : boucle aller-retour de 2,5 s (`public/videos/gouttes*.mp4`), lue
  seulement à l'écran ; trois gestes qui défilent pendant que la vidéo reste figée.
- **Menu** (`CollectionMenu.jsx`), **galerie horizontale** épinglée (`HorizontalGallery.jsx`), titres révélés
  mot à mot (`motion/RevealText`), mots qui s'allument (`motion/ScrubWords`), parallaxe (`motion/Parallax`),
  compteurs (`motion/CountUp`), rideau de transition entre pages (`App.jsx`).
- L'en-tête est **fixe** et devient transparent/nacre au-dessus de toute section marquée `data-header="dark"`.

Règles (bugs déjà rencontrés) :
- Tout ce qui **épingle** (`pin: true`) se met en place dans `useIsomorphicLayoutEffect`, jamais `useEffect` :
  GSAP enveloppe l'élément et doit le rendre avant que React ne le retire (sinon erreur `removeChild`).
- Pour figer une section, préférer CSS `sticky` + `scrub` (aucun déplacement du DOM).
- Une classe CSS hors couche ne doit pas définir `position` (elle écraserait `sticky` de Tailwind) : cf. `.grain`.
- Animer `clip-path` avec `fromTo` entre deux `inset(...)` (pas vers `none`).
- Textes masqués au départ (`invisible`) uniquement s'ils ne sont pas essentiels sans JavaScript.

Régénérer la séquence d'intro à partir d'une nouvelle vidéo (ffmpeg + Python/Pillow) :
1. `ffmpeg -i ouverture.mp4 raw/%03d.png`
2. garder 96 images réparties régulièrement ; `d/NNN.webp` = 1600×900 qualité 58 ;
   `m/NNN.webp` = 62 % central de la largeur, 780 px de large ; `poster.webp` / `poster-m.webp` = première image.
3. Mettre à jour `INTRO.frames` et `INTRO.bg` (couleur du fond de la vidéo) dans `IntroSequence.jsx`.

 (d'après le packaging, oct. 2026)

Références : `public/images/marque/` (coffret bleu nuit, logo argenté, « MADE IN FRANCE », poignées cuivrées, marbre).
- **Couleurs** : jetons dans `@theme` de `src/index.css`. Bleu nuit `night` (héros, manifeste, pied de page),
  crème `paper`, encre bleue `ink`, cuivre rosé `copper` en touches, nacre `on-night` sur fond bleu.
  Tricolore uniquement en filet sous « Fabriqué en France » (`<Tricolore />`).
- **Typographie** : titres **EB Garamond** (proche du logo), texte **Geist**, sur-titres en capitales très espacées
  (`.eyebrow`). Ne pas utiliser Cormorant / Cormorant Garamond : leurs fichiers placent mal les accents è et ê.
  Polices auto-hébergées (`@fontsource`), aucune requête vers Google Fonts (RGPD).
- **Logo** : `src/components/Logo.jsx` reproduit le coffret en texte ; à remplacer par le SVG officiel dès qu'il existe.
- **Visuels** : produits en 3:2 sur marbre, lumière dorée, fond de cuisine sombre. Apparitions au défilement via
  l'attribut `data-reveal` (valeur = délai en ms) ; mouvement réduit respecté.
- **Ton** : sobre, précis, vouvoiement, pas d'emoji.

## Visuels générés par IA

Les images de `public/images/produits`, `atelier` et `ambiance` ont été générées avec ElevenLabs (Seedream)
d'après la DA. Ce sont des maquettes : **les remplacer par des photos des vraies pièces avant d'ouvrir la vente**.

## À confirmer avant la mise en ligne

- Catalogue, tailles, prix, caractéristiques (`src/data/products.js` est un exemple).
- Allégations : « Fabriqué en France », « Garantie à vie », « sans PFAS », conditions de livraison et de retour.
- Pages légales (`src/pages/Legal.jsx`) : raison sociale, SIREN, TVA, médiateur, prestataires. `--strict` les liste.
- Domaine, adresse e-mail, compte Instagram (`src/data/site.js`).
- **Ouvrir l'indexation** : `indexable: true` dans `src/data/site.js` (en pré-lancement, toutes les pages sont en
  `noindex` et `robots.txt` bloque les robots). `--strict` échoue tant que ce n'est pas fait.

## Sécurité

En-têtes dans `netlify.toml` : HSTS, CSP stricte (`'self'` uniquement, aucun script tiers), anti-iframe.
Toute nouvelle origine (paiement, statistiques, carte, vidéo) doit y être ajoutée explicitement.
Aucun cookie déposé : pas de bandeau de consentement. Ajouter un outil de mesure = revoir la politique de
confidentialité et le consentement.
