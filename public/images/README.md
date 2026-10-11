# Images Silkura

| Dossier | Contenu | Format conseillé |
| --- | --- | --- |
| `marque/` | Visuels de DA fournis (packaging, coffret, collection) | 3:2, 1600 px de large |
| `produits/` | Photos des pièces (`<piece>-1.webp` = photo principale) | 3:2, 1400 px de large |
| `atelier/` | Fabrication, détails (rivets, gravure) | 16:9, 1800 px de large |
| `ambiance/` | Cuisine en situation, entretien | 16:9, 1800 px de large |

- Formats : WebP (ou JPG), moins de 200 Ko par image si possible.
- Les chemins se renseignent dans `src/data/products.js` (`images`) et `src/data/site.js` (`media`).
- Une image absente (`null` ou liste vide) est remplacée par une illustration : rien ne casse.

⚠ Les images de `produits/`, `atelier/` et `ambiance/` sont générées par IA (ElevenLabs) d'après
la DA du packaging. Elles servent de maquette : avant d'ouvrir la vente, les remplacer par des photos
des vraies pièces (le client doit voir exactement ce qu'il achète).
