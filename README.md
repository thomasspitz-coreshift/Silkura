# Silkura

Site de la marque Silkura : ustensiles de cuisson en inox 3 plis, fabriqués en France.

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # build complet + contrôle des liens et des pages
```

- Contenus (pièces, prix, coordonnées) : `src/data/`
- Images : `public/images/` (voir le README du dossier)
- Conventions, DA et points à confirmer : `CLAUDE.md`

Déploiement : Netlify (commande `npm run build`, dossier `dist`), configuré dans `netlify.toml`.
