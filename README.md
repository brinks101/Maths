# Maths — cours interactif du lycée

Un site de cours de mathématiques en HTML/CSS/JS pur : **aucune dépendance, aucun build,
aucun réseau**. Fait pour être projeté, manipulé, et relu à la maison.

## Contenu

Quatre sections, chacune avec son propre sommaire :

| Section | Chapitres | Diapos |
| --- | --- | --- |
| **Automatismes** | 7 | 20 |
| **Première Spé** | 14 | 74 |
| **Terminale Spé** | 15 | 67 |
| **Maths Expertes** | 7 | 35 |

- **Automatismes** : fractions, puissances et racines, pourcentages, calcul littéral,
  équations et inéquations, valeur absolue, dérivées usuelles.
- **Première Spé** (programme 2026, BO n° 14 du 2 avril 2026) : second degré, polynômes
  de degré 3, suites, suites arithmétiques et géométriques, dérivation, étude des
  fonctions, exponentielle, trigonométrie, produit scalaire, géométrie repérée,
  probabilités conditionnelles, variables aléatoires, échantillonnage, algorithmique.
- **Terminale Spé** : limites de suites et de fonctions, continuité et TVI, convexité,
  logarithme, exponentielles, trigonométrie, primitives, intégrales, équations
  différentielles, combinatoire, loi binomiale, géométrie de l’espace.
- **Maths Expertes** : nombres complexes (algèbre et géométrie), équations
  polynomiales, arithmétique, graphes, matrices et chaînes de Markov.

Une diapo = une notion : un titre, les formules en très grand, au plus une ligne de
mots. Aucun exercice. Les figures gardent leurs curseurs de réglage.

## Ouvrir

- Double-clic sur `index.html` (Chrome) : tout fonctionne en `file://`.
- Ou depuis un terminal : `python3 -m http.server 8100` dans ce dossier, puis
  `http://127.0.0.1:8100`.
- Raccourci `maths` (fish et bash) : ouvre le site dans Chrome.

## Navigation

`←` `→` / Espace pour changer de diapo, `M` pour le sommaire du chapitre, `F` en plein
écran, `N` pour la page blanche de notes, `Échap` pour fermer.

Le fil d’Ariane en haut à gauche remonte au **sommaire de la classe** (`Première Spé`),
puis à **l’accueil** (`Maths`). Un chapitre est autonome : la dernière diapo atteinte,
le diaporama s’arrête ; on ressort par le fil d’Ariane pour ouvrir un autre chapitre.
Le sommaire (`M`) ne liste que les diapos du chapitre ouvert.

## Graphiques

Chaque figure a un bouton **⤢ Agrandir**. En mode agrandi, il ne reste que le graphique
et sa carte de réglages, dans une colonne défilante : les paramètres restent réglables
pendant qu’on manipule la figure, et la diapo disparaît.

- **Zoom** : paliers 10, 25, 50, 75, 100, 125, 150, 200, 250, 300, 400 %.
  Boutons `−` / `+`, molette, ou touches `+` / `-`. `↺` (ou `0`) revient à 100 %.
- **Déplacer** : glisser sur le graphique, ou flèches `←` `↑` `→` `↓`.
- Le zoom est un zoom de caméra : le repère est recalculé à chaque palier, le canvas
  garde sa taille, donc les traits et les étiquettes restent nets.

## Page de notes (`N`)

Page blanche par-dessus le cours : stylo **noir** ou **rouge**, taille de trait,
**gomme**, outil **déplacer**, **zoom libre** 20–1 000 %, `Ctrl+Z` pour annuler.
Le dessin est mémorisé en coordonnées « monde » et conservé quand on ferme la page.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | accueil : les quatre sections |
| `niveau.html` | sommaire d’une section (`?n=premiere`) |
| `cours.html` | diaporama d’un chapitre (`?n=premiere&c=second-degre`) |
| `styles.css` | thème sombre chaud, mises en page, zoom des figures |
| `js/catalogue.js` | sections, chapitres et ordre des chapitres |
| `js/hub.js`, `js/level.js` | rendu de l’accueil et des sommaires |
| `js/deck.js` | moteur de diapos : navigation, sommaire, agrandissement, zoom |
| `js/kit.js` | fabrique de diapos (titre, formules, ligne, figure) |
| `js/plots.js` | figures : repère, courbes, tangentes, aires, points |
| `js/helpers.js` | formats français, fractions, racines, canvas net, curseurs |
| `js/note.js` | page blanche de notes |
| `js/slides-auto.js` | automatismes de base (fractions, puissances, pourcentages) |
| `js/slides-trigo.js` | chapitre Trigonométrie (triangle, cercle, équations) |
| `js/contenu-automatismes.js` | calcul littéral, équations, valeur absolue, dérivées |
| `js/contenu-premiere.js` | chapitres de Première Spé |
| `js/contenu-terminale.js` | chapitres de Terminale Spé |
| `js/contenu-expertes.js` | chapitres de Maths Expertes |

## Ajouter une diapo

```js
Kit.slide('chapitre-id', {
  id: 'chapitre-id-notion',
  kicker: 'Chapitre · 1',
  title: 'Titre court',
  formula: ['f(x) = …'],
  line: 'Une seule phrase.',
  plot(canvas, panel) {
    return G.frame(canvas, panel, {
      view: { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
      params: [{ key: 'a', label: 'a', min: -2, max: 2, step: 0.1, value: 1 }],
      draw(p) {
        p.plot((x) => p.state.a * x * x);
      },
      readout(s) {
        return `a = ${M.com(s.a)}`;
      },
    });
  },
});
```

Ajouter ensuite le chapitre dans `js/catalogue.js` (ordre du sommaire) et le fichier de
contenu dans `cours.html`. Les identifiants de diapo sont uniques dans tout le site.

## Sources

Programmes officiels (Première : BO n° 14 du 2 avril 2026 ; Terminale et Maths Expertes :
programmes en vigueur), manuel Sésamath et manuel Lelivrescolaire, notes de cours
Notion. Les diapos reformulent le cours ; elles ne recopient pas les manuels.
