# Photos Silkura

Déposer ici les photos du site (JPG ou WebP, côté long 2000 px maximum, < 400 Ko si possible).

Organisation conseillée :

- `hero/` : grande photo d'accueil (paysage 16:9 ou plus large)
- `produits/<slug>/` : photos d'une pièce (`1.jpg` = photo principale, carrée ou 4:5)
- `atelier/` : fabrication, matière, mains, cuisine en situation
- `ambiance/` : photos lifestyle (tables, plats, cuisines)

Puis renseigner le chemin dans `src/data/products.js` (`images`) ou `src/data/site.js` (`media`).
Tant qu'une photo manque, le site affiche une illustration à la place : rien ne casse.
