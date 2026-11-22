# Maths — cours interactif du lycée

Un site de cours de mathématiques en HTML/CSS/JS pur : **aucune dépendance, aucun build,
aucun réseau**. Fait pour être projeté, manipulé, et relu à la maison.

## Contenu

Trois sections, chacune avec son propre sommaire. Les chapitres suivent l’ordre et les
intitulés des manuels de spécialité (Lelivrescolaire / Sésamath) :

| Section | Chapitres | Diapos |
| --- | --- | --- |
| **Première Spé** | 12 | 102 |
| **Terminale Spé** | 14 | 107 |
| **Maths Expertes** | 7 | 57 |

- **Première Spé** : suites numériques ; fonctions de référence ; équations et inéquations
  du second degré ; dérivation ; applications de la dérivation ; fonction exponentielle ;
  trigonométrie ; fonctions trigonométriques ; produit scalaire ; configurations
  géométriques ; probabilités conditionnelles ; variables aléatoires réelles.
- **Terminale Spé** : combinatoire et dénombrement ; vecteurs, droites et plans de
  l’espace ; orthogonalité et distances ; suites ; limites de fonctions ; continuité ;
  compléments sur la dérivation ; logarithme népérien ; fonctions trigonométriques ;
  primitives et équations différentielles ; calcul intégral ; loi binomiale ; sommes de
  variables aléatoires ; loi des grands nombres.
- **Maths Expertes** : nombres complexes (points de vue algébrique et géométrique) ;
  divisibilité dans ℤ ; PGCD et applications ; nombres premiers ; calcul matriciel et
  applications aux graphes ; suites et matrices (chaînes de Markov).

Une diapo = une notion du cours, avec les blocs utiles : **définition**, **théorème**,
**propriété**, **méthode** et **exemple**. Aucun exercice. Les figures gardent leurs
curseurs de réglage. Chaque chapitre couvre l’intégralité du cours du manuel correspondant.

Le sommaire d’une classe est présenté en **deux colonnes** et tient sur un seul écran,
sans défilement.

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
| `index.html` | accueil : les trois sections |
| `niveau.html` | sommaire d’une section (`?n=premiere`), en deux colonnes |
| `cours.html` | diaporama d’un chapitre (`?n=premiere&c=suites`) |
| `styles.css` | thème sombre chaud, mises en page, blocs de cours, zoom des figures |
| `js/catalogue.js` | sections, chapitres et ordre des chapitres |
| `js/hub.js`, `js/level.js` | rendu de l’accueil et des sommaires |
| `js/deck.js` | moteur de diapos : navigation, sommaire, agrandissement, zoom |
| `js/kit.js` | fabrique de diapos (blocs définition/théorème/propriété/méthode/exemple, figures) |
| `js/plots.js` | figures : repère, courbes, tangentes, aires, points |
| `js/helpers.js` | formats français, fractions, racines, canvas net, curseurs |
| `js/note.js` | page blanche de notes |
| `js/slides-trigo.js` | chapitre Trigonométrie : cercle, angles associés, équations interactives |
| `js/contenu-premiere.js` | chapitres de Première Spé |
| `js/contenu-terminale.js` | chapitres de Terminale Spé |
| `js/contenu-expertes.js` | chapitres de Maths Expertes |

## Ajouter une diapo

```js
Kit.slide('chapitre-id', {
  id: 'chapitre-id-notion',
  kicker: 'Chapitre · 1',
  title: 'Titre court',
  def: 'La définition, en une ou deux phrases.',
  prop: ['Une propriété.', 'Une autre propriété.'],
  formula: ['f(x) = …'],
  meth: ['Première étape.', 'Deuxième étape.'],
  ex: 'Un exemple chiffré.',
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

Sommaires et cours des manuels de spécialité : **Lelivrescolaire** (Première spécialité
2019 MAJ 2026, Terminale spécialité 2020, Terminale expertes 2020), **Sésamath**
(Première spécialité 2019, Terminale spécialité 2020, Terminale expertes 2020) et notes
de cours **Notion**. Les diapos reformulent le cours ; elles ne recopient pas les manuels.
