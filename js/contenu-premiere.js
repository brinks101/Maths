// Première spécialité — cours aligné sur les chapitres du manuel
// (Lelivrescolaire 1re spécialité / Sésamath 1re spécialité).
// One notion per slide, with definition, theorem, property, method and example
// blocks so that the whole lesson of the chapter is present.
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;

  /* ==================== Suites numériques ==================== */

  K.slide('suites', {
    id: 'suites-definition',
    kicker: 'Suites · 1',
    title: 'Une suite est une fonction de ℕ',
    def: [
      'Une suite (u<sub>n</sub>) associe à chaque entier naturel n un réel u<sub>n</sub>, appelé terme d’indice n. La suite est définie sur ℕ tout entier.',
      'Formule explicite : u<sub>n</sub> s’écrit directement en fonction de n.',
      'Relation de récurrence : u<sub>n+1</sub> s’exprime à partir de u<sub>n</sub> (et éventuellement de n).',
    ],
    formula: ['u : ℕ → ℝ,  n ↦ u<sub>n</sub>'],
    ex: 'u<sub>n</sub> = 2n + 1 donne u₀ = 1, u₁ = 3, u₂ = 5. La suite définie par u₀ = 1 et u<sub>n+1</sub> = u<sub>n</sub> + 3 donne 1, 4, 7, 10.',
  });

  K.slide('suites', {
    id: 'suites-representation',
    kicker: 'Suites · 2',
    title: 'Représenter une suite',
    def: [
      'Dans un repère, on place les points de coordonnées (n ; u<sub>n</sub>) pour n = 0, 1, 2, …',
      'Contrairement à une fonction, l’ensemble des points est discret : on ne relie pas les points par une courbe.',
    ],
    formula: ['points (n ; u<sub>n</sub>)'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 12, ymin: -2, ymax: 14 },
        params: [
          { key: 'u0', label: 'premier terme u₀', min: -2, max: 6, step: 0.5, value: 1, decimals: 1 },
          { key: 'r', label: 'raison r', min: -1.5, max: 2, step: 0.1, value: 0.8, decimals: 1 },
        ],
        draw(p) {
          const pts = [];
          for (let n = 0; n <= 12; n += 1) pts.push([n, p.state.u0 + n * p.state.r]);
          G.dots(p, pts, { stems: true, color: C.ACCENT });
        },
        readout(s) {
          return (
            `<div class="kv"><dt>terme général</dt><dd>u<sub>n</sub> = ${M.com(s.u0)} + ${M.com(s.r)} n</dd></div>` +
            `<div class="kv"><dt>u₁₂</dt><dd>${M.com(s.u0 + 12 * s.r)}</dd></div>`
          );
        },
        caption: 'Suite arithmétique : les points restent alignés.',
      });
    },
  });

  K.slide('suites', {
    id: 'suites-variations',
    kicker: 'Suites · 3',
    title: 'Sens de variation',
    def: [
      '(u<sub>n</sub>) est croissante si u<sub>n+1</sub> ≥ u<sub>n</sub> pour tout n, décroissante si u<sub>n+1</sub> ≤ u<sub>n</sub> pour tout n, constante si u<sub>n+1</sub> = u<sub>n</sub> pour tout n.',
    ],
    prop: [
      'On étudie le signe de u<sub>n+1</sub> − u<sub>n</sub> : positif → croissante, négatif → décroissante.',
      'Si tous les termes sont strictement positifs, on peut comparer le quotient u<sub>n+1</sub> / u<sub>n</sub> à 1.',
    ],
    ex: 'u<sub>n</sub> = n² : u<sub>n+1</sub> − u<sub>n</sub> = (n + 1)² − n² = 2n + 1 &gt; 0, donc (u<sub>n</sub>) est strictement croissante.',
  });

  K.slide('suites', {
    id: 'suites-arithmetique',
    kicker: 'Suites · 4',
    title: 'Suites arithmétiques',
    def: [
      '(u<sub>n</sub>) est arithmétique de raison r si u<sub>n+1</sub> = u<sub>n</sub> + r pour tout n.',
    ],
    prop: [
      'Terme général : u<sub>n</sub> = u₀ + n r, et plus généralement u<sub>n</sub> = u<sub>p</sub> + (n − p) r.',
      'Variations : croissante si r &gt; 0, décroissante si r &lt; 0, constante si r = 0.',
      'Somme de n + 1 termes : S = (nombre de termes) × (premier + dernier) / 2.',
      'Moyenne : chaque terme est la moyenne arithmétique de ses voisins.',
    ],
    ex: 'u₀ = 3 et r = 2 : u<sub>n</sub> = 3 + 2n, donc u₁₀ = 23. La somme u₀ + … + u₁₀ vaut 11 × (3 + 23) / 2 = 143.',
  });

  K.slide('suites', {
    id: 'suites-geometrique',
    kicker: 'Suites · 5',
    title: 'Suites géométriques',
    def: [
      '(u<sub>n</sub>) est géométrique de raison q (q ≠ 0) si u<sub>n+1</sub> = q u<sub>n</sub> pour tout n.',
    ],
    prop: [
      'Terme général : u<sub>n</sub> = u₀ q<sup>n</sup>, et u<sub>n</sub> = u<sub>p</sub> q<sup>n−p</sup>.',
      'Si u₀ &gt; 0 : croissante si q &gt; 1, décroissante si 0 &lt; q &lt; 1, alternée si q &lt; 0.',
      'Somme de n + 1 termes : S = u₀ + u₁ + … + u<sub>n</sub> = u₀ × (1 − q<sup>n+1</sup>) / (1 − q) si q ≠ 1.',
    ],
    ex: 'u₀ = 500 et q = 1,04 : u<sub>n</sub> = 500 × 1,04<sup>n</sup>. Le terme u₁₂ vaut environ 800,5.',
  });

  K.slide('suites', {
    id: 'suites-modelisation',
    kicker: 'Suites · 6',
    title: 'Choisir le bon modèle',
    prop: [
      'Une quantité qui augmente (ou diminue) toujours de la même valeur absolue suit une suite arithmétique.',
      'Une quantité qui augmente (ou diminue) d’un même pourcentage suit une suite géométrique : le coefficient multiplicateur est la raison.',
      '+ t % correspond à la raison 1 + t/100 ; − t % correspond à 1 − t/100.',
    ],
    ex: 'Un compte à 1 000 € rémunéré à 3 % par an : u<sub>n</sub> = 1 000 × 1,03<sup>n</sup>. Un compte augmenté de 30 € par an : v<sub>n</sub> = 1 000 + 30n.',
  });

  K.slide('suites', {
    id: 'suites-sommes',
    kicker: 'Suites · 7',
    title: 'Les formules de somme',
    formula: [
      '1 + 2 + … + n = ' + f('n(n + 1)', '2'),
      '1 + q + q² + … + q<sup>n</sup> = ' + f('1 − q<sup>n+1</sup>', '1 − q') + '  (q ≠ 1)',
    ],
    meth: [
      'Repérer le nombre de termes de la somme.',
      'Pour une suite arithmétique : premier terme, dernier terme, moyenne, fois le nombre de termes.',
      'Pour une suite géométrique : factoriser par le premier terme, puis appliquer la formule.',
    ],
    ex: '1 + 2 + … + 50 = 50 × 51 / 2 = 1 275. Et 1 + 2 + 4 + … + 2¹⁰ = (1 − 2¹¹)/(1 − 2) = 2 047.',
  });

  K.slide('suites', {
    id: 'suites-methode',
    kicker: 'Suites · 8',
    title: 'Prouver une nature arithmétique ou géométrique',
    meth: [
      'Calculer u<sub>n+1</sub> à partir de l’expression de u<sub>n</sub>.',
      'Arithmétique : montrer que u<sub>n+1</sub> − u<sub>n</sub> est constant, égal à r.',
      'Géométrique : montrer que u<sub>n+1</sub> / u<sub>n</sub> est constant, égal à q (termes non nuls).',
    ],
    ex: 'u<sub>n</sub> = 3n − 5 : u<sub>n+1</sub> − u<sub>n</sub> = 3, donc arithmétique de raison 3. v<sub>n</sub> = 2 × 1,05<sup>n</sup> : v<sub>n+1</sub> / v<sub>n</sub> = 1,05, donc géométrique de raison 1,05.',
  });

  /* ==================== Fonctions de référence ==================== */

  K.slide('fonctions-reference', {
    id: 'fr-tableau',
    kicker: 'Fonctions de référence · 1',
    title: 'Les fonctions à connaître',
    tab: {
      head: ['f(x)', 'Domaine', 'Parité', 'Variations'],
      align: ['center', 'center', 'center', 'left'],
      rows: [
        ['x²', 'ℝ', 'paire', 'décroissante sur ]−∞ ; 0], croissante sur [0 ; +∞['],
        ['x³', 'ℝ', 'impaire', 'strictement croissante sur ℝ'],
        [f('1', 'x'), 'ℝ \\ {0}', 'impaire', 'décroissante sur ]−∞ ; 0[ et sur ]0 ; +∞['],
        [r('x'), '[0 ; +∞[', 'ni paire ni impaire', 'strictement croissante'],
      ],
      caption: 'Les quatre fonctions de référence à connaître par cœur, avec leur domaine et leur sens de variation.',
    },
    rem: 'La courbe de x² est une parabole de sommet O ; celle de x³ passe par O avec une tangente horizontale ; celle de 1/x a deux branches et deux asymptotes.',
  });

  K.slide('fonctions-reference', {
    id: 'fr-parite',
    kicker: 'Fonctions de référence · 2',
    title: 'Parité d’une fonction',
    def: [
      'f est paire si, pour tout x de son domaine, f(−x) = f(x). Sa courbe est symétrique par rapport à l’axe des ordonnées.',
      'f est impaire si, pour tout x de son domaine, f(−x) = −f(x). Sa courbe est symétrique par rapport à l’origine O.',
    ],
    ex: 'x² et |x| sont paires ; x³, x et 1/x sont impaires. La fonction x ↦ x² + x n’est ni paire ni impaire.',
  });

  K.slide('fonctions-reference', {
    id: 'fr-courbes',
    kicker: 'Fonctions de référence · 3',
    title: 'Les courbes de référence',
    formula: ['y = x² · y = x³ · y = ' + r('x') + ' · y = ' + f('1', 'x')],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -3, xmax: 4, ymin: -2, ymax: 5 },
        params: [],
        draw(p) {
          p.plot((x) => x * x, { color: C.ACCENT, width: 2.4 });
          p.plot((x) => x * x * x, { color: C.BLUE, width: 2.2 });
          p.plot((x) => (x >= 0 ? Math.sqrt(x) : NaN), { color: C.SIN, width: 2.2 });
          p.plot((x) => (x === 0 ? NaN : 1 / x), { color: C.VIOLET, width: 2 });
          p.text(-2.6, 4.4, 'x²', { color: C.ACCENT, bold: true });
          p.text(2.6, 4.4, 'x³', { color: C.BLUE, bold: true });
          p.text(3.2, 1.8, '√x', { color: C.SIN, bold: true });
          p.text(1.2, -1.6, '1/x', { color: C.VIOLET, bold: true });
        },
      });
    },
  });

  K.slide('fonctions-reference', {
    id: 'fr-transformations',
    kicker: 'Fonctions de référence · 4',
    title: 'Transformations de courbes',
    tab: {
      head: ['Expression', 'Effet sur la courbe'],
      align: ['center', 'left'],
      rows: [
        ['f(x) + k', 'translation verticale de k'],
        ['f(x − a)', 'translation horizontale de a'],
        ['k f(x)', 'étirement vertical si |k| &gt; 1, écrasement si |k| &lt; 1'],
        ['−f(x)', 'symétrie par rapport à l’axe des abscisses'],
        ['f(−x)', 'symétrie par rapport à l’axe des ordonnées'],
      ],
      caption: 'Retenir l’effet sur la courbe, puis le vérifier sur un point : la transformation est immédiate.',
    },
    ex: 'À partir de la parabole y = x², la courbe de (x − 2)² + 3 est obtenue en décalant de 2 vers la droite et de 3 vers le haut.',
  });

  K.slide('fonctions-reference', {
    id: 'fr-comparaison',
    kicker: 'Fonctions de référence · 5',
    title: 'Comparer les fonctions',
    prop: [
      'Pour 0 ≤ x ≤ 1 : x³ ≤ x² ≤ x ≤ ' + r('x') + '.',
      'Pour x ≥ 1 : ' + r('x') + ' ≤ x ≤ x² ≤ x³.',
      'Pour x &gt; 0 : x et ' + f('1', 'x') + ' sont dans le même ordre que ' + f('1', 'x') + ' et 1.',
    ],
    ex: '0,5² = 0,25 &lt; 0,5 et √0,5 ≈ 0,707 &gt; 0,5. En revanche 2² = 4 &gt; 2 et √2 ≈ 1,414 &lt; 2.',
  });

  K.slide('fonctions-reference', {
    id: 'fr-equations',
    kicker: 'Fonctions de référence · 6',
    title: 'Équations et inéquations',
    tab: {
      head: ['Équation', 'Solutions'],
      align: ['center', 'left'],
      rows: [
        ['x² = a', 'si a &gt; 0 : x = −√a ou x = √a ; si a = 0 : x = 0 ; si a &lt; 0 : aucune'],
        ['x³ = a', 'une solution : x = ∛a'],
        [r('x') + ' = a', 'si a ≥ 0 : x = a² ; sinon aucune'],
        [f('1', 'x') + ' = a', 'si a ≠ 0 : x = 1/a ; aucune si a = 0'],
      ],
      caption: 'Toujours vérifier les conditions d’existence avant de conclure.',
    },
    meth: [
      'Isoler la puissance ou la racine.',
      'Vérifier les conditions d’existence (racine : x ≥ 0 ; quotient : x ≠ 0).',
      'Conclure avec le tableau ci-dessus, puis contrôler sur la courbe.',
    ],
  });

  K.slide('fonctions-reference', {
    id: 'fr-methode',
    kicker: 'Fonctions de référence · 7',
    title: 'Résoudre une inéquation',
    meth: [
      'Se ramener à une comparaison entre deux fonctions de référence.',
      'Utiliser les variations et les points d’intersection connus.',
      'Conclure sur le bon intervalle, en vérifiant les bornes.',
    ],
    ex: 'Pour x ≥ 0, √x ≤ x équivaut à x ≤ x², soit x(x − 1) ≥ 0, donc x = 0 ou x ≥ 1. Sur [0 ; 1], c’est la racine qui est au-dessus.',
  });

  /* ==================== Équations et inéquations du second degré ==================== */

  K.slide('second-degre', {
    id: 'sd-formes',
    kicker: 'Second degré · 1',
    title: 'Trois écritures d’un trinôme',
    def: [
      'Un trinôme du second degré s’écrit f(x) = ax² + bx + c avec a ≠ 0.',
      'Forme canonique : f(x) = a(x − α)² + β, où α = −b/(2a) et β = f(α). Le point S(α ; β) est le sommet de la parabole.',
      'Forme factorisée (quand elle existe) : f(x) = a(x − x₁)(x − x₂).',
    ],
    formula: ['f(x) = a(x − α)² + β', `α = − ${f('b', '2a')},  β = f(α)`],
    ex: 'f(x) = 2x² − 8x + 5 = 2(x − 2)² − 3 : le sommet est S(2 ; −3).',
  });

  K.slide('second-degre', {
    id: 'sd-discriminant',
    kicker: 'Second degré · 2',
    title: 'Le discriminant',
    def: ['Le discriminant du trinôme ax² + bx + c est Δ = b² − 4ac.'],
    prop: [
      'Δ &gt; 0 : deux racines réelles distinctes x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a).',
      'Δ = 0 : une racine double x₀ = −b/(2a).',
      'Δ &lt; 0 : aucune racine réelle.',
    ],
    formula: ['Δ = b² − 4ac', `x₁ = ${f('−b − √Δ', '2a')},  x₂ = ${f('−b + √Δ', '2a')}`],
  });

  K.slide('second-degre', {
    id: 'sd-somme-produit',
    kicker: 'Second degré · 3',
    title: 'Somme et produit des racines',
    prop: [
      'Lorsque Δ ≥ 0, les racines vérifient x₁ + x₂ = −b/a et x₁ x₂ = c/a.',
      'Réciproquement, deux réels de somme S et de produit P sont les racines de x² − Sx + P = 0.',
    ],
    formula: [`x₁ + x₂ = − ${f('b', 'a')}`, `x₁ x₂ = ${f('c', 'a')}`],
    ex: 'Les racines de 2x² − 5x + 2 sont 1/2 et 2 : leur somme vaut 5/2 et leur produit 1.',
  });

  K.slide('second-degre', {
    id: 'sd-signe',
    kicker: 'Second degré · 4',
    title: 'Le signe du trinôme',
    thm: [
      'Le trinôme est du signe de a à l’extérieur de l’intervalle des racines, et du signe opposé entre les racines.',
    ],
    tab: {
      type: 'variations',
      headLabel: 'x',
      x: ['−∞', 'x₁', 'x₂', '+∞'],
      rows: [
        { label: 'a &gt; 0', signs: ['+', '−', '+'], zeros: [false, true, true, false] },
        { label: 'a &lt; 0', signs: ['−', '+', '−'], zeros: [false, true, true, false] },
      ],
      caption: 'Le signe de a donne le signe à l’extérieur des racines ; entre les racines, c’est le signe opposé.',
    },
    formula: ['f(x) = a(x − x₁)(x − x₂)'],
    rem: 'Si Δ = 0, le trinôme garde le signe de a sur ℝ et s’annule en x₀. Si Δ &lt; 0, il garde le signe de a partout.',
  });

  K.slide('second-degre', {
    id: 'sd-variations',
    kicker: 'Second degré · 5',
    title: 'Sommet et variations',
    prop: [
      'Si a &gt; 0, f est décroissante sur ]−∞ ; α] puis croissante sur [α ; +∞[ : le minimum vaut β, atteint en α.',
      'Si a &lt; 0, f est croissante sur ]−∞ ; α] puis décroissante sur [α ; +∞[ : le maximum vaut β, atteint en α.',
    ],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -6, xmax: 6, ymin: -8, ymax: 10 },
        params: [
          { key: 'a', label: 'a', min: -2, max: 2, step: 0.1, value: 1 },
          { key: 'b', label: 'b', min: -6, max: 6, step: 0.5, value: 0, decimals: 1 },
          { key: 'c', label: 'c', min: -6, max: 6, step: 0.5, value: -3, decimals: 1 },
        ],
        draw(p) {
          const { a, b, c } = p.state;
          const fn = (x) => a * x * x + b * x + c;
          const alpha = a ? -b / (2 * a) : 0;
          const beta = fn(alpha);
          p.plot(fn);
          if (a) {
            p.vline(alpha, { color: 'rgba(124, 176, 255, 0.35)', dash: [5, 5] });
            p.dot(alpha, beta, { color: C.BLUE, r: 5, label: 'S', dy: -14 });
          }
        },
        readout(s) {
          const { a, b, c } = s;
          const alpha = a ? -b / (2 * a) : NaN;
          const beta = a ? a * alpha * alpha + b * alpha + c : NaN;
          return `α = ${M.com(alpha)} · β = ${M.com(beta)} · Δ = ${M.com(b * b - 4 * a * c)}`;
        },
      });
    },
  });

  K.slide('second-degre', {
    id: 'sd-equation',
    kicker: 'Second degré · 6',
    title: 'Résoudre une équation du second degré',
    meth: [
      'Identifier a, b et c, puis calculer Δ = b² − 4ac.',
      'Si Δ &gt; 0, appliquer les deux formules de racines ; si Δ = 0, donner la racine double ; si Δ &lt; 0, conclure qu’il n’y a pas de solution réelle.',
      'Vérifier les racines en les remplaçant dans l’équation.',
    ],
    ex: '2x² − 5x + 2 = 0 : Δ = 25 − 16 = 9, donc x₁ = (5 − 3)/4 = 1/2 et x₂ = (5 + 3)/4 = 2. D’où 2x² − 5x + 2 = 2(x − 1/2)(x − 2).',
  });

  K.slide('second-degre', {
    id: 'sd-inequation',
    kicker: 'Second degré · 7',
    title: 'Résoudre une inéquation',
    meth: [
      'Écrire l’inéquation sous la forme ax² + bx + c ≥ 0 (ou ≤ 0, &gt;, &lt;).',
      'Calculer Δ et les racines éventuelles.',
      'Faire un tableau de signes, puis lire les intervalles solutions.',
    ],
    ex: '−x² + 3x − 2 ≥ 0 : Δ = 9 − 8 = 1, racines 1 et 2 ; a = −1 &lt; 0, donc le trinôme est positif entre les racines : S = [1 ; 2].',
  });

  K.slide('second-degre', {
    id: 'sd-position',
    kicker: 'Second degré · 8',
    title: 'Parabole et droite',
    prop: [
      'Les abscisses des points d’intersection de la parabole y = ax² + bx + c et de la droite y = mx + p sont les solutions de ax² + (b − m)x + (c − p) = 0.',
      'Le discriminant de cette différence donne le nombre de points d’intersection : 2, 1 (tangence) ou 0.',
    ],
    ex: 'La parabole y = x² et la droite y = 2x − 1 se coupent là où x² − 2x + 1 = 0, soit (x − 1)² = 0 : elles sont tangentes en x = 1.',
  });

  K.slide('second-degre', {
    id: 'sd-optimisation',
    kicker: 'Second degré · 9',
    title: 'Optimiser avec un trinôme',
    meth: [
      'Modéliser la grandeur à optimiser par un trinôme, en précisant le domaine de la variable.',
      'Mettre le trinôme sous forme canonique, ou calculer α = −b/(2a).',
      'Conclure : le sommet donne le maximum (a &lt; 0) ou le minimum (a &gt; 0).',
    ],
    ex: 'Pour une clôture de 40 m contre un mur, l’aire vaut A(x) = x(40 − 2x) = −2(x − 10)² + 200 : aire maximale 200 m² pour x = 10 m.',
  });

  /* ==================== Dérivation ==================== */

  K.slide('derivation', {
    id: 'der-taux',
    kicker: 'Dérivation · 1',
    title: 'Nombre dérivé et taux de variation',
    def: [
      'Le taux de variation de f entre a et a + h est [f(a + h) − f(a)] / h. C’est la pente de la sécante passant par les deux points.',
      'Le nombre dérivé f′(a) est la limite de ce taux quand h tend vers 0, si elle existe. C’est la pente de la tangente en a.',
    ],
    formula: [`f′(a) = lim<sub>h→0</sub> ${f('f(a + h) − f(a)', 'h')}`],
    ex: 'Pour f(x) = x², le taux vaut (2ah + h²)/h = 2a + h, donc f′(a) = 2a.',
  });

  K.slide('derivation', {
    id: 'der-tangente',
    kicker: 'Dérivation · 2',
    title: 'L’équation de la tangente',
    prop: [
      'Si f est dérivable en a, la tangente à la courbe au point d’abscisse a a pour équation y = f(a) + f′(a)(x − a).',
      'C’est la meilleure approximation affine de f au voisinage de a.',
    ],
    formula: ['y = f(a) + f′(a)(x − a)'],
    ex: 'f(x) = x² en a = 1 : f(1) = 1 et f′(1) = 2, donc T : y = 1 + 2(x − 1) = 2x − 1.',
  });

  K.slide('derivation', {
    id: 'der-usuelles',
    kicker: 'Dérivation · 3',
    title: 'Dérivées usuelles',
    tab: {
      head: ['f(x)', 'f′(x)', 'sur'],
      align: ['center', 'center', 'left'],
      rows: [
        ['k (constante)', '0', 'ℝ'],
        ['x<sup>n</sup>', 'n x<sup>n−1</sup>', 'ℝ'],
        [f('1', 'x'), '− ' + f('1', 'x²'), 'ℝ \\ {0}'],
        [r('x'), f('1', `2${r('x')}`), ']0 ; +∞['],
        ['e<sup>x</sup>', 'e<sup>x</sup>', 'ℝ'],
        ['sin x', 'cos x', 'ℝ'],
        ['cos x', '− sin x', 'ℝ'],
      ],
      caption: 'Dérivées à savoir réciter dans les deux sens : dériver, mais aussi reconnaître une primitive.',
    },
    rem: 'Ces formules se lisent aussi dans l’autre sens pour chercher une primitive.',
  });

  K.slide('derivation', {
    id: 'der-operations',
    kicker: 'Dérivation · 4',
    title: 'Opérations sur les dérivées',
    prop: [
      'Somme : (u + v)′ = u′ + v′.',
      'Produit : (uv)′ = u′v + uv′.',
      'Quotient : (u/v)′ = (u′v − uv′)/v², avec v ≠ 0.',
      'Composée : (u ∘ v)′ = v′ × u′(v), et (u<sup>n</sup>)′ = n u′ u<sup>n−1</sup>, (e<sup>u</sup>)′ = u′ e<sup>u</sup>.',
    ],
    ex: 'f(x) = (x² + 1)e<sup>x</sup> : f′(x) = 2x e<sup>x</sup> + (x² + 1)e<sup>x</sup> = (x² + 2x + 1)e<sup>x</sup>.',
  });

  K.slide('derivation', {
    id: 'der-signe',
    kicker: 'Dérivation · 5',
    title: 'Le signe de f′ donne les variations',
    thm: [
      'Si f′ ≥ 0 sur un intervalle I, alors f est croissante sur I. Si f′ ≤ 0 sur I, alors f est décroissante sur I.',
      'Si f′ s’annule et change de signe en a, alors f admet un extremum local en a : maximum si le signe passe de + à −, minimum s’il passe de − à +.',
    ],
    rem: 'f′(a) = 0 ne suffit pas à garantir un extremum : x ↦ x³ a une dérivée nulle en 0, mais reste croissante.',
  });

  K.slide('derivation', {
    id: 'der-tableau',
    kicker: 'Dérivation · 6',
    title: 'Construire un tableau de variations',
    meth: [
      'Calculer f′ et factoriser son expression.',
      'Étudier le signe de f′ sur le domaine de f.',
      'Placer les valeurs qui annulent f′ et les limites aux bornes.',
      'Lire les flèches de variation et les extremums.',
    ],
    ex: 'f(x) = x³ − 3x : f′(x) = 3(x − 1)(x + 1). f′ &gt; 0 hors de [−1 ; 1], donc f croît, décroît, croît : maximum local 2 en −1, minimum local −2 en 1.',
  });

  K.slide('derivation', {
    id: 'der-figure',
    kicker: 'Dérivation · 7',
    title: 'De la sécante à la tangente',
    formula: [`pente de la sécante = ${f('f(a + h) − f(a)', 'h')}`],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 4, ymin: -1, ymax: 7 },
        params: [
          { key: 'a', label: 'abscisse a', min: 0, max: 3, step: 0.1, value: 1 },
          { key: 'h', label: 'écart h', min: 0.05, max: 2, step: 0.05, value: 1.5 },
        ],
        draw(p) {
          const a = p.state.a;
          const h = p.state.h;
          const fn = (x) => x * x;
          p.plot(fn);
          p.tangent(fn, a, { color: C.BLUE, label: 'tangente' });
          p.line(a, fn(a), a + h, fn(a + h), { color: C.SIN, width: 2.2 });
          p.dot(a + h, fn(a + h), { color: C.SIN, r: 4.5 });
          p.text(a + h * 0.5, fn(a) + 0.4, 'sécante', { color: C.SIN, align: 'center' });
        },
        readout(s) {
          const slope = 2 * s.a;
          const secant = 2 * s.a + s.h;
          return `pente sécante = ${M.com(secant)} · f′(a) = ${M.com(slope)}`;
        },
      });
    },
  });

  /* ==================== Applications de la dérivation ==================== */

  K.slide('applications-derivation', {
    id: 'ad-variations',
    kicker: 'Applications de la dérivation · 1',
    title: 'Étudier les variations',
    thm: [
      'Soit f dérivable sur un intervalle I. Si f′ &gt; 0 sur I (sauf éventuellement en des points isolés), f est strictement croissante sur I. Si f′ &lt; 0, f est strictement décroissante.',
    ],
    formula: ['f′ &gt; 0 ⟹ f ↗', 'f′ &lt; 0 ⟹ f ↘'],
    ex: 'f(x) = x + 1/x sur ]0 ; +∞[ : f′(x) = 1 − 1/x² = (x − 1)(x + 1)/x², négative sur ]0 ; 1[, positive sur ]1 ; +∞[. Minimum f(1) = 2.',
  });

  K.slide('applications-derivation', {
    id: 'ad-extremum',
    kicker: 'Applications de la dérivation · 2',
    title: 'Extremums locaux',
    def: [
      'f admet un maximum local en a si f(a) ≥ f(x) pour les x voisins de a. Un minimum local se définit de façon analogue.',
    ],
    prop: [
      'Si f est dérivable en a et si f admet un extremum local en a, alors f′(a) = 0.',
      'La réciproque est fausse : il faut que f′ change de signe en a.',
    ],
    rem: 'Sur un intervalle fermé, le maximum global est atteint soit en un extremum local, soit à une borne.',
  });

  K.slide('applications-derivation', {
    id: 'ad-tableau',
    kicker: 'Applications de la dérivation · 3',
    title: 'Le tableau de variations complet',
    tab: {
      type: 'variations',
      headLabel: 'x',
      x: ['0', '1', '+∞'],
      rows: [
        { label: 'f′(x)', signs: ['−', '+'], zeros: [false, true, false] },
        { label: 'f(x)', values: ['+∞', '2', '+∞'], arrows: ['down', 'up'] },
      ],
      caption: 'f(x) = x + 1/x sur ]0 ; +∞[ : le minimum vaut 2, atteint en x = 1.',
    },
    ex: 'Pour f(x) = x + 1/x sur ]0 ; +∞[, le tableau confirme le minimum 2 en x = 1. Aux bornes : f(x) → +∞ en 0⁺ et en +∞.',
  });

  K.slide('applications-derivation', {
    id: 'ad-equation',
    kicker: 'Applications de la dérivation · 4',
    title: 'Nombre de solutions de f(x) = k',
    meth: [
      'Étudier les variations de f et dresser son tableau.',
      'Repérer les extremums et le sens de variation sur chaque intervalle.',
      'Compter les intersections de la courbe avec la droite horizontale y = k.',
    ],
    ex: 'f(x) = x³ − 3x : f(x) = 0 a trois solutions (une dans chacun des intervalles séparés par −1 et 1) ; f(x) = 2 en a deux ; f(x) = 3 une seule.',
  });

  K.slide('applications-derivation', {
    id: 'ad-optimisation',
    kicker: 'Applications de la dérivation · 5',
    title: 'Optimiser',
    meth: [
      'Choisir une variable et exprimer la grandeur à optimiser en fonction de cette variable.',
      'Déterminer le domaine de validité.',
      'Dériver, étudier le signe et trouver l’extremum.',
      'Répondre au problème avec les unités.',
    ],
    ex: 'Un rectangle de périmètre 20 a pour aire A(x) = x(10 − x). A′(x) = 10 − 2x s’annule en 5 : l’aire maximale est 25, pour un carré de côté 5.',
  });

  K.slide('applications-derivation', {
    id: 'ad-position',
    kicker: 'Applications de la dérivation · 6',
    title: 'Position relative de deux courbes',
    prop: [
      'Pour comparer f et g, on étudie le signe de h = f − g.',
      'h &gt; 0 : la courbe de f est au-dessus de celle de g ; h &lt; 0 : elle est en dessous ; h = 0 : elles se coupent.',
      'La dérivée de h donne les variations de l’écart et permet de prouver une inégalité.',
    ],
    ex: 'e<sup>x</sup> ≥ 1 + x pour tout x : h(x) = e<sup>x</sup> − 1 − x a pour dérivée e<sup>x</sup> − 1, négative puis positive, et h(0) = 0 est son minimum.',
  });

  K.slide('applications-derivation', {
    id: 'ad-etude',
    kicker: 'Applications de la dérivation · 7',
    title: 'Une étude complète',
    def: ['f(x) = x³ − 3x² + 2 sur ℝ.'],
    prop: [
      'f′(x) = 3x² − 6x = 3x(x − 2).',
      'f′ &gt; 0 sur ]−∞ ; 0[ ∪ ]2 ; +∞[, f′ &lt; 0 sur ]0 ; 2[.',
      'Maximum local f(0) = 2, minimum local f(2) = −2.',
    ],
    tab: {
      type: 'variations',
      headLabel: 'x',
      x: ['−∞', '0', '2', '+∞'],
      rows: [
        { label: 'f′(x)', signs: ['+', '−', '+'], zeros: [false, true, true, false] },
        { label: 'f(x)', values: ['−∞', '2', '−2', '+∞'], arrows: ['up', 'down', 'up'] },
      ],
      caption: 'Maximum local 2 en x = 0, minimum local −2 en x = 2 : la courbe change deux fois de sens.',
    },
    ex: 'La courbe coupe l’axe des abscisses trois fois : entre −1 et 0, entre 0 et 2, et au-delà de 2.',
  });

  K.slide('applications-derivation', {
    id: 'ad-figure',
    kicker: 'Applications de la dérivation · 8',
    title: 'Voir les extremums',
    formula: ['f(x) = x³ − 3ax'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -4, xmax: 4, ymin: -8, ymax: 8 },
        params: [{ key: 'a', label: 'a', min: 0, max: 4, step: 0.1, value: 1 }],
        draw(p) {
          const a = p.state.a;
          const fn = (x) => x * x * x - 3 * a * x;
          p.plot(fn);
          if (a > 0) {
            const root = Math.sqrt(a);
            p.dot(-root, fn(-root), { color: C.BLUE, r: 5, label: 'max' });
            p.dot(root, fn(root), { color: C.SIN, r: 5, label: 'min' });
          }
        },
        readout(s) {
          if (s.a <= 0) return 'a = 0 : pas d’extremum (point d’inflexion)';
          return `extrema en x = ± ${M.com(Math.sqrt(s.a))}`;
        },
      });
    },
  });

  /* ==================== Fonction exponentielle ==================== */

  K.slide('exponentielle', {
    id: 'exp-definition',
    kicker: 'Exponentielle · 1',
    title: 'La fonction exponentielle',
    thm: [
      'Il existe une unique fonction f dérivable sur ℝ telle que f′ = f et f(0) = 1. C’est la fonction exponentielle, notée f(x) = e<sup>x</sup>.',
    ],
    prop: [
      'e<sup>x</sup> &gt; 0 pour tout réel x.',
      'e ≈ 2,718 ; e⁰ = 1 ; e¹ = e.',
    ],
    formula: ['f′ = f  et  f(0) = 1', 'f(x) = e<sup>x</sup>'],
  });

  K.slide('exponentielle', {
    id: 'exp-proprietes',
    kicker: 'Exponentielle · 2',
    title: 'Propriétés algébriques',
    prop: [
      'e<sup>a+b</sup> = e<sup>a</sup> e<sup>b</sup> ; e<sup>a−b</sup> = e<sup>a</sup> / e<sup>b</sup>.',
      'e<sup>−a</sup> = 1 / e<sup>a</sup> ; (e<sup>a</sup>)<sup>n</sup> = e<sup>na</sup> pour n entier.',
      'e<sup>a</sup> = e<sup>b</sup> ⟺ a = b ; e<sup>a</sup> &lt; e<sup>b</sup> ⟺ a &lt; b.',
    ],
    ex: 'e<sup>2x</sup> × e<sup>−x</sup> = e<sup>x</sup> ; (e<sup>x</sup>)² = e<sup>2x</sup> ; e<sup>ln 2</sup> = 2.',
  });

  K.slide('exponentielle', {
    id: 'exp-derivee',
    kicker: 'Exponentielle · 3',
    title: 'Dériver une exponentielle',
    prop: [
      '(e<sup>x</sup>)′ = e<sup>x</sup>.',
      'Pour une fonction u dérivable, (e<sup>u</sup>)′ = u′ e<sup>u</sup>.',
    ],
    ex: '(e<sup>2x</sup>)′ = 2e<sup>2x</sup> ; (e<sup>−x</sup>)′ = −e<sup>−x</sup> ; (e<sup>x²</sup>)′ = 2x e<sup>x²</sup>.',
  });

  K.slide('exponentielle', {
    id: 'exp-signe',
    kicker: 'Exponentielle · 4',
    title: 'Signe et monotonie',
    prop: [
      'e<sup>x</sup> &gt; 0 pour tout x, donc la courbe reste au-dessus de l’axe des abscisses.',
      'La dérivée e<sup>x</sup> est positive : la fonction exponentielle est strictement croissante sur ℝ.',
      'Conséquence : e<sup>x</sup> = e<sup>y</sup> ⟺ x = y, et e<sup>x</sup> &lt; e<sup>y</sup> ⟺ x &lt; y.',
    ],
    ex: 'e<sup>x</sup> &gt; 1 équivaut à x &gt; 0 ; e<sup>x</sup> &lt; e² équivaut à x &lt; 2.',
  });

  K.slide('exponentielle', {
    id: 'exp-limites',
    kicker: 'Exponentielle · 5',
    title: 'Limites et allure',
    prop: [
      'lim<sub>x→−∞</sub> e<sup>x</sup> = 0 : l’axe des abscisses est une asymptote horizontale en −∞.',
      'lim<sub>x→+∞</sub> e<sup>x</sup> = +∞ : la croissance est très rapide.',
    ],
    formula: ['lim<sub>x→−∞</sub> e<sup>x</sup> = 0', 'lim<sub>x→+∞</sub> e<sup>x</sup> = +∞'],
    ex: 'La tangente en 0 a pour équation y = 1 + x, car e⁰ = 1 et (e<sup>x</sup>)′(0) = 1.',
  });

  K.slide('exponentielle', {
    id: 'exp-equations',
    kicker: 'Exponentielle · 6',
    title: 'Équations et inéquations',
    prop: [
      'e<sup>x</sup> = a admet une solution x = ln a si a &gt; 0, aucune si a ≤ 0.',
      'e<sup>u</sup> = e<sup>v</sup> ⟺ u = v ; e<sup>u</sup> &lt; e<sup>v</sup> ⟺ u &lt; v.',
    ],
    meth: [
      'Isoler l’exponentielle, ou se ramener à une égalité entre deux exponentielles.',
      'Utiliser la stricte croissance pour passer aux exposants.',
      'Vérifier que les solutions sont dans le domaine.',
    ],
    ex: 'e<sup>2x</sup> = 3 ⟺ 2x = ln 3 ⟺ x = (ln 3)/2. Et e<sup>x²</sup> &lt; e<sup>x</sup> ⟺ x² &lt; x ⟺ 0 &lt; x &lt; 1.',
  });

  K.slide('exponentielle', {
    id: 'exp-figure',
    kicker: 'Exponentielle · 7',
    title: 'La tangente en 0',
    formula: ['(e<sup>kx</sup>)′ = k e<sup>kx</sup>'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -2.5, xmax: 2.5, ymin: -1, ymax: 8 },
        params: [{ key: 'k', label: 'k', min: -1.5, max: 2, step: 0.1, value: 1 }],
        draw(p) {
          const k = p.state.k;
          const fn = (x) => Math.exp(k * x);
          p.plot(fn);
          p.tangent(fn, 0, { color: C.BLUE, label: 'en 0' });
        },
        readout(s) {
          return `pente en 0 : ${M.com(s.k)}`;
        },
      });
    },
  });

  K.slide('exponentielle', {
    id: 'exp-exemple',
    kicker: 'Exponentielle · 8',
    title: 'Une étude avec exponentielle',
    def: ['f(x) = (x + 1)e<sup>−x</sup> sur ℝ.'],
    prop: [
      'f′(x) = e<sup>−x</sup> − (x + 1)e<sup>−x</sup> = −x e<sup>−x</sup>.',
      'f′ &gt; 0 pour x &lt; 0, f′ &lt; 0 pour x &gt; 0 : maximum f(0) = 1.',
      'f(x) → 0 en +∞ ; f(x) → −∞ en −∞.',
    ],
    ex: 'La courbe passe par (−1 ; 0), monte jusqu’à (0 ; 1), puis redescend vers l’axe des abscisses sans le traverser.',
  });

  /* ==================== Trigonométrie (compléments au deck interactif) ==================== */

  K.slide('trigo', {
    id: 'trigo-radian',
    kicker: 'Trigonométrie · 0',
    title: 'Le radian',
    def: [
      'Un angle de 1 radian intercepte un arc de longueur 1 sur le cercle unité. La mesure en radians d’un angle est la longueur de l’arc correspondant sur le cercle de rayon 1.',
      'Un tour complet vaut 2π radians, soit 360°. Le demi-tour vaut π.',
    ],
    formula: ['180° = π rad', 'degré → radian : × π/180'],
    ex: '30° = π/6 ; 45° = π/4 ; 60° = π/3 ; 90° = π/2 ; 120° = 2π/3 ; 270° = 3π/2.',
  });

  K.slide('trigo', {
    id: 'trigo-relation',
    kicker: 'Trigonométrie · 0',
    title: 'La relation fondamentale',
    thm: [
      'Pour tout réel x, cos² x + sin² x = 1. Le point de coordonnées (cos x ; sin x) est sur le cercle unité.',
    ],
    prop: [
      'tan x = sin x / cos x, défini lorsque cos x ≠ 0.',
      '−1 ≤ cos x ≤ 1 et −1 ≤ sin x ≤ 1.',
      'cos et sin sont périodiques de période 2π ; cos est paire, sin est impaire.',
    ],
    formula: ['cos² x + sin² x = 1', 'tan x = ' + f('sin x', 'cos x')],
  });

  /* ==================== Fonctions trigonométriques ==================== */

  K.slide('fonctions-trigo', {
    id: 'ft-definition',
    kicker: 'Fonctions trigonométriques · 1',
    title: 'Deux fonctions périodiques',
    def: [
      'À tout réel x, on associe le point du cercle trigonométrique : cos x est l’abscisse, sin x l’ordonnée.',
      'Les fonctions cos et sin sont définies sur ℝ, à valeurs dans [−1 ; 1], et périodiques de période 2π.',
      'cos est paire, sin est impaire.',
    ],
    formula: ['cos(x + 2π) = cos x', 'sin(x + 2π) = sin x', 'cos(−x) = cos x,  sin(−x) = −sin x'],
  });

  K.slide('fonctions-trigo', {
    id: 'ft-variations',
    kicker: 'Fonctions trigonométriques · 2',
    title: 'Variations sur un tour',
    tab: {
      type: 'variations',
      headLabel: 'x',
      x: ['0', 'π/2', 'π', '3π/2', '2π'],
      rows: [
        { label: 'cos x', values: ['1', '0', '−1', '0', '1'], arrows: ['down', 'down', 'up', 'up'] },
        { label: 'sin x', values: ['0', '1', '0', '−1', '0'], arrows: ['up', 'down', 'down', 'up'] },
      ],
      caption: 'Un tour complet suffit : les deux fonctions sont périodiques de période 2π.',
    },
    prop: [
      'cos est décroissante sur [0 ; π] et croissante sur [π ; 2π].',
      'sin est croissante sur [0 ; π/2], décroissante sur [π/2 ; 3π/2], croissante sur [3π/2 ; 2π].',
    ],
  });

  K.slide('fonctions-trigo', {
    id: 'ft-courbes',
    kicker: 'Fonctions trigonométriques · 3',
    title: 'Les sinusoïdes',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -7, xmax: 7, ymin: -2, ymax: 2 },
        params: [],
        draw(p) {
          p.plot((x) => Math.cos(x), { color: C.ACCENT, width: 2.4 });
          p.plot((x) => Math.sin(x), { color: C.SIN, width: 2.4 });
          p.text(0.4, 1.25, 'cos x', { color: C.ACCENT, bold: true });
          p.text(1.9, 1.15, 'sin x', { color: C.SIN, bold: true });
          p.vline(0, { color: 'rgba(246, 241, 232, 0.2)' });
        },
      });
    },
    rem: 'La courbe de sin s’obtient à partir de celle de cos par un décalage de π/2 vers la droite : sin x = cos(x − π/2).',
  });

  K.slide('fonctions-trigo', {
    id: 'ft-derivees',
    kicker: 'Fonctions trigonométriques · 4',
    title: 'Dériver cos et sin',
    prop: [
      '(sin x)′ = cos x et (cos x)′ = −sin x.',
      'Pour une fonction u : (sin u)′ = u′ cos u et (cos u)′ = −u′ sin u.',
    ],
    formula: ['(sin x)′ = cos x', '(cos x)′ = − sin x'],
    ex: 'f(x) = sin(2x) : f′(x) = 2 cos(2x). g(x) = cos(x²) : g′(x) = −2x sin(x²).',
  });

  K.slide('fonctions-trigo', {
    id: 'ft-equations',
    kicker: 'Fonctions trigonométriques · 5',
    title: 'Résoudre cos x = a et sin x = a',
    prop: [
      'cos x = cos α ⟺ x = α + 2kπ ou x = −α + 2kπ, k ∈ ℤ.',
      'sin x = sin α ⟺ x = α + 2kπ ou x = π − α + 2kπ, k ∈ ℤ.',
      'On commence par chercher une solution α sur [0 ; 2π] à l’aide du cercle.',
    ],
    ex: 'cos x = 1/2 : x = π/3 + 2kπ ou x = −π/3 + 2kπ. sin x = 1/2 : x = π/6 + 2kπ ou x = 5π/6 + 2kπ.',
  });

  K.slide('fonctions-trigo', {
    id: 'ft-inequations',
    kicker: 'Fonctions trigonométriques · 6',
    title: 'Résoudre une inéquation trigonométrique',
    meth: [
      'Repérer les points du cercle où l’égalité a lieu.',
      'Choisir l’arc du cercle qui correspond à l’inégalité.',
      'Ajouter la période 2π à chaque intervalle trouvé.',
    ],
    ex: 'Sur [0 ; 2π], cos x ≥ 1/2 ⟺ x ∈ [0 ; π/3] ∪ [5π/3 ; 2π]. Sur ℝ, on ajoute 2kπ à ces intervalles.',
  });

  K.slide('fonctions-trigo', {
    id: 'ft-etude',
    kicker: 'Fonctions trigonométriques · 7',
    title: 'Étudier une fonction trigonométrique',
    def: ['f(x) = cos(2x) sur [0 ; π].'],
    prop: [
      'f′(x) = −2 sin(2x). Sur ]0 ; π[, sin(2x) &gt; 0 pour x ∈ ]0 ; π/2[ et sin(2x) &lt; 0 pour x ∈ ]π/2 ; π[.',
      'f est donc décroissante sur [0 ; π/2] et croissante sur [π/2 ; π].',
      'Minimum f(π/2) = cos π = −1 ; maximum f(0) = f(π) = 1.',
    ],
    rem: 'La période de x ↦ cos(2x) est π, et non 2π : la fonction fait un tour complet deux fois plus vite.',
  });

  /* ==================== Produit scalaire ==================== */

  K.slide('produit-scalaire', {
    id: 'ps-definition',
    kicker: 'Produit scalaire · 1',
    title: 'Un produit qui mesure les angles',
    def: [
      'Le produit scalaire de deux vecteurs u et v non nuls est u · v = ‖u‖ × ‖v‖ × cos θ, où θ est l’angle entre u et v.',
      'Si l’un des vecteurs est nul, le produit scalaire vaut 0.',
    ],
    formula: ['u · v = ‖u‖ ‖v‖ cos θ', 'u ⊥ v ⟺ u · v = 0'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -0.5, xmax: 4, ymin: -1, ymax: 3 },
        params: [{ key: 'deg', label: 'angle θ', min: 0, max: 180, step: 5, value: 60, decimals: 0, format: (v) => `${v}°` }],
        draw(p) {
          const t = (p.state.deg * Math.PI) / 180;
          const vx = 2 * Math.cos(t);
          const vy = 2 * Math.sin(t);
          p.line(0, 0, 3, 0, { color: C.ACCENT, width: 3 });
          p.line(0, 0, vx, vy, { color: C.SIN, width: 3 });
          p.text(3, 0, 'u', { color: C.ACCENT, dy: -14, align: 'center' });
          p.text(vx, vy, 'v', { color: C.SIN, dy: -14, align: 'center' });
          p.line(vx, vy, vx, 0, { color: C.BLUE, dash: [4, 4] });
          p.dot(vx, 0, { color: C.BLUE, r: 4 });
          p.dot(0, 0, { color: C.MUTED, r: 3.5 });
        },
        readout(s) {
          const t = (s.deg * Math.PI) / 180;
          return `u · v = ${M.com(6 * Math.cos(t))} · cos θ = ${M.com(Math.cos(t))}`;
        },
      });
    },
  });

  K.slide('produit-scalaire', {
    id: 'ps-coordonnees',
    kicker: 'Produit scalaire · 2',
    title: 'En coordonnées',
    prop: [
      'Dans un repère orthonormé, si u(x ; y) et v(x′ ; y′), alors u · v = xx′ + yy′.',
      'La norme vaut ‖u‖ = √(x² + y²) et la distance AB = ‖AB‖ = √((x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²).',
    ],
    formula: ['u · v = xx′ + yy′', '‖u‖ = √(x² + y²)'],
    ex: 'u(2 ; 3) et v(1 ; −4) : u · v = 2 − 12 = −10. ‖u‖ = √13.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-proprietes',
    kicker: 'Produit scalaire · 3',
    title: 'Propriétés du produit scalaire',
    prop: [
      'Symétrie : u · v = v · u.',
      'Linéarité : u · (v + w) = u · v + u · w et (αu) · v = α(u · v).',
      'u · u = ‖u‖² ≥ 0, avec égalité si et seulement si u = 0.',
      'En particulier, (u + v)² = ‖u‖² + 2u · v + ‖v‖².',
    ],
    formula: ['u · (v + w) = u · v + u · w', 'u · u = ‖u‖²'],
  });

  K.slide('produit-scalaire', {
    id: 'ps-normes',
    kicker: 'Produit scalaire · 4',
    title: 'Normes et produit scalaire',
    formula: [
      '‖u + v‖² = ‖u‖² + 2 u · v + ‖v‖²',
      'u · v = ' + f('1', '2') + '(‖u + v‖² − ‖u‖² − ‖v‖²)',
    ],
    ex: 'Si ‖u‖ = 3, ‖v‖ = 4 et ‖u + v‖ = 5, alors 25 = 9 + 16 + 2u · v, donc u · v = 0 : les vecteurs sont orthogonaux.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-orthogonalite',
    kicker: 'Produit scalaire · 5',
    title: 'Prouver un angle droit',
    prop: [
      'Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.',
      'En coordonnées : u(x ; y) ⊥ v(x′ ; y′) ⟺ xx′ + yy′ = 0.',
    ],
    ex: 'AB(3 ; 2) et AC(2 ; −3) : AB · AC = 6 − 6 = 0, donc le triangle ABC est rectangle en A.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-alkashi',
    kicker: 'Produit scalaire · 6',
    title: 'Théorème d’Al-Kashi',
    thm: [
      'Dans un triangle ABC, avec a = BC, b = AC et c = AB : a² = b² + c² − 2bc cos Â.',
      'C’est une généralisation du théorème de Pythagore aux triangles quelconques.',
    ],
    formula: ['a² = b² + c² − 2bc cos Â', 'cos Â = ' + f('b² + c² − a²', '2bc')],
    ex: 'b = 5, c = 7 et Â = 60° : a² = 25 + 49 − 70 × 0,5 = 39, donc a = √39 ≈ 6,24.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-projete',
    kicker: 'Produit scalaire · 7',
    title: 'Projeté orthogonal',
    def: [
      'Le projeté orthogonal H d’un point M sur une droite d est le point de d tel que (MH) ⊥ d. C’est le point de d le plus proche de M.',
    ],
    prop: [
      'Si H est le projeté de M sur d et A un point de d, alors AM · AH = AM · u, où u est un vecteur directeur unitaire de d.',
      'La distance de M à d est MH = ‖AM‖ × |sin θ|, avec θ l’angle entre AM et d.',
    ],
    ex: 'La distance d’un point M(x₀ ; y₀) à la droite ax + by + c = 0 vaut |ax₀ + by₀ + c| / √(a² + b²).',
  });

  K.slide('produit-scalaire', {
    id: 'ps-applications',
    kicker: 'Produit scalaire · 8',
    title: 'Calculer longueurs et angles',
    meth: [
      'Choisir deux vecteurs bien placés et exprimer leurs coordonnées.',
      'Calculer le produit scalaire et les normes.',
      'Utiliser cos θ = (u · v)/(‖u‖ ‖v‖) pour l’angle, ou ‖u‖ = √(u · u) pour une longueur.',
    ],
    ex: 'Dans un repère, A(0 ; 0), B(4 ; 0) et C(1 ; 3). AB · AC = 4, ‖AB‖ = 4, ‖AC‖ = √10, donc cos Â = 1/√10 et Â ≈ 71,6°.',
  });

  /* ==================== Configurations géométriques ==================== */

  K.slide('configurations-geometriques', {
    id: 'cg-vecteurs',
    kicker: 'Configurations géométriques · 1',
    title: 'Vecteurs et colinéarité',
    prop: [
      'Deux vecteurs u(x ; y) et v(x′ ; y′) sont colinéaires si et seulement si xy′ − x′y = 0.',
      'Trois points A, B et C sont alignés si et seulement si AB et AC sont colinéaires.',
      'Les droites (AB) et (CD) sont parallèles si et seulement si AB et CD sont colinéaires.',
    ],
    formula: ['u colinéaire à v ⟺ xy′ − x′y = 0'],
    ex: 'u(3 ; −2) et v(−6 ; 4) : 3 × 4 − (−2)(−6) = 12 − 12 = 0, donc u et v sont colinéaires (v = −2u).',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-droite',
    kicker: 'Configurations géométriques · 2',
    title: 'Équation cartésienne d’une droite',
    prop: [
      'Toute droite a une équation de la forme ax + by + c = 0, avec (a ; b) ≠ (0 ; 0).',
      'Un vecteur directeur est (−b ; a) ; un vecteur normal est (a ; b).',
      'Réciproquement, l’ensemble des points vérifiant ax + by + c = 0 est une droite de vecteur normal (a ; b).',
    ],
    formula: ['ax + by + c = 0', 'directeur (−b ; a),  normal (a ; b)'],
    ex: 'La droite d’équation 2x − 3y + 1 = 0 a pour vecteur normal (2 ; −3) et pour vecteur directeur (3 ; 2).',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-parallelles-perpendiculaires',
    kicker: 'Configurations géométriques · 3',
    title: 'Parallélisme et perpendicularité',
    prop: [
      'Deux droites sont parallèles si et seulement si leurs vecteurs normaux sont colinéaires (ou leurs directeurs colinéaires).',
      'Deux droites sont perpendiculaires si et seulement si leurs vecteurs normaux sont orthogonaux : aa′ + bb′ = 0.',
      'Une droite de normale (a ; b) est perpendiculaire à toute droite de directeur (a ; b).',
    ],
    ex: 'd : 2x + y − 1 = 0 et d′ : x − 2y + 3 = 0 : 2 × 1 + 1 × (−2) = 0, donc d ⊥ d′.',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-cercle',
    kicker: 'Configurations géométriques · 4',
    title: 'Équation d’un cercle',
    prop: [
      'Le cercle de centre Ω(a ; b) et de rayon r a pour équation (x − a)² + (y − b)² = r².',
      'Forme développée : x² + y² − 2ax − 2by + a² + b² − r² = 0.',
      'Réciproquement, x² + y² + Dx + Ey + F = 0 est un cercle si D² + E² − 4F &gt; 0.',
    ],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -3, xmax: 7, ymin: -3, ymax: 7 },
        params: [
          { key: 'a', label: 'centre a', min: -2, max: 4, step: 0.5, value: 2, decimals: 1 },
          { key: 'b', label: 'centre b', min: -2, max: 4, step: 0.5, value: 2, decimals: 1 },
          { key: 'r', label: 'rayon r', min: 0.5, max: 3, step: 0.5, value: 2, decimals: 1 },
        ],
        draw(p) {
          const { a, b, r: radius } = p.state;
          const upper = (x) => b + Math.sqrt(Math.max(0, radius * radius - (x - a) * (x - a)));
          const lower = (x) => b - Math.sqrt(Math.max(0, radius * radius - (x - a) * (x - a)));
          p.plot(upper, { color: C.ACCENT, width: 2.6 });
          p.plot(lower, { color: C.ACCENT, width: 2.6 });
          p.dot(a, b, { color: C.BLUE, r: 5, label: 'Ω' });
          p.line(a, b, a + radius, b, { color: C.SIN, width: 2 });
          p.text(a + radius / 2, b, 'r', { color: C.SIN, dy: -12, align: 'center' });
        },
      });
    },
  });

  K.slide('configurations-geometriques', {
    id: 'cg-distance',
    kicker: 'Configurations géométriques · 5',
    title: 'Distance d’un point à une droite',
    thm: [
      'La distance d’un point M(x₀ ; y₀) à la droite d’équation ax + by + c = 0 est MH = |ax₀ + by₀ + c| / √(a² + b²).',
    ],
    formula: ['MH = ' + f('|ax₀ + by₀ + c|', '√(a² + b²)')],
    ex: 'Distance de M(1 ; 2) à d : 3x + 4y − 5 = 0 : |3 + 8 − 5|/5 = 6/5 = 1,2.',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-intersections',
    kicker: 'Configurations géométriques · 6',
    title: 'Intersections',
    meth: [
      'Droite et droite : résoudre le système des deux équations ; aucune, une ou une infinité de solutions.',
      'Droite et cercle : substituer l’équation de la droite dans celle du cercle et étudier le discriminant.',
      'Cercle et cercle : soustraire les équations pour obtenir l’axe radical, puis substituer.',
    ],
    ex: 'La droite y = x coupe le cercle (x − 1)² + y² = 1 là où (x − 1)² + x² = 1, soit 2x² − 2x = 0 : aux points (0 ; 0) et (1 ; 1).',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-projete',
    kicker: 'Configurations géométriques · 7',
    title: 'Projeté orthogonal et distance',
    def: [
      'Le projeté orthogonal H de M sur la droite d est l’intersection de d avec la droite perpendiculaire à d passant par M.',
      'La distance de M à d est la longueur MH.',
    ],
    meth: [
      'Écrire un vecteur normal à d.',
      'Écrire l’équation de la perpendiculaire à d passant par M.',
      'Résoudre le système pour obtenir H, puis calculer MH.',
    ],
    ex: 'M(2 ; 3), d : y = x. La perpendiculaire a pour équation y = −x + 5 ; elle coupe d en H(2,5 ; 2,5), donc MH = √0,5 ≈ 0,707.',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-lieux',
    kicker: 'Configurations géométriques · 8',
    title: 'Lieux géométriques',
    prop: [
      'L’ensemble des points équidistants de A et B est la médiatrice de [AB].',
      'L’ensemble des points M tels que MA = r est le cercle de centre A et de rayon r.',
      'L’ensemble des points M tels que MA² + MB² = k est un cercle (ou un point, ou vide) ; on le trouve en développant avec le milieu de [AB].',
    ],
    ex: 'M(x ; y) avec MA² − MB² = 0 : en développant, les termes x² et y² s’éliminent et on obtient l’équation d’une droite, la médiatrice.',
  });

  K.slide('configurations-geometriques', {
    id: 'cg-methode',
    kicker: 'Configurations géométriques · 9',
    title: 'Démontrer une configuration',
    meth: [
      'Traduire l’énoncé en coordonnées ou en vecteurs.',
      'Utiliser colinéarité, orthogonalité, équation de droite ou de cercle.',
      'Conclure en revenant à la propriété géométrique demandée.',
    ],
    ex: 'Pour montrer qu’un triangle est rectangle en A, on calcule AB · AC : s’il est nul, l’angle est droit. Pour montrer qu’il est isocèle en A, on compare ‖AB‖ et ‖AC‖.',
  });

  /* ==================== Probabilités conditionnelles ==================== */

  K.slide('probabilites-conditionnelles', {
    id: 'pc-definition',
    kicker: 'Probabilités conditionnelles · 1',
    title: 'Conditionner, c’est restreindre l’univers',
    def: [
      'Pour deux événements A et B avec P(A) &gt; 0, la probabilité de B sachant A est P<sub>A</sub>(B) = P(A ∩ B) / P(A).',
      'On divise par P(A) : l’univers se réduit à A.',
    ],
    formula: ['P<sub>A</sub>(B) = ' + f('P(A ∩ B)', 'P(A)'), 'P(A ∩ B) = P(A) × P<sub>A</sub>(B)'],
    ex: 'Dans un lycée, 40 % des élèves font du sport (A) et 24 % font du sport et de la musique (A ∩ B). Alors P<sub>A</sub>(B) = 0,24/0,40 = 0,6.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-arbre',
    kicker: 'Probabilités conditionnelles · 2',
    title: 'L’arbre pondéré',
    prop: [
      'Sur une branche, on écrit la probabilité conditionnelle de l’événement sachant celui du nœud précédent.',
      'La probabilité d’un chemin est le produit des probabilités de ses branches.',
      'La probabilité d’un événement est la somme des probabilités des chemins qui le réalisent.',
    ],
    formula: ['produit le long d’une branche', 'somme des chemins disjoints'],
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-totales',
    kicker: 'Probabilités conditionnelles · 3',
    title: 'Formule des probabilités totales',
    thm: [
      'Si A₁, A₂, …, A<sub>n</sub> forment une partition de l’univers, alors P(B) = Σ P(A<sub>i</sub>) × P<sub>A<sub>i</sub></sub>(B).',
    ],
    formula: ['P(B) = P(A) P<sub>A</sub>(B) + P(Ā) P<sub>Ā</sub>(B)'],
    ex: 'Une usine produit 60 % en A et 40 % en B ; 2 % des pièces de A et 5 % de B sont défectueuses. P(D) = 0,6 × 0,02 + 0,4 × 0,05 = 0,032.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-independance',
    kicker: 'Probabilités conditionnelles · 4',
    title: 'Indépendance',
    def: [
      'A et B sont indépendants si P(A ∩ B) = P(A) × P(B).',
      'Lorsque P(A) &gt; 0, cela équivaut à P<sub>A</sub>(B) = P(B) : savoir que A est réalisé ne change rien.',
    ],
    rem: 'Indépendant n’est pas incompatible : deux événements incompatibles (A ∩ B = ∅) de probabilités non nulles sont au contraire dépendants.',
    ex: 'On lance deux dés : A « le premier donne 6 » et B « le second donne 6 » sont indépendants. A et « la somme vaut 7 » ne le sont pas.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-tableau',
    kicker: 'Probabilités conditionnelles · 5',
    title: 'Lire un tableau de contingence',
    tab: {
      head: ['', 'B', 'B̄', 'Total'],
      align: ['center', 'center', 'center', 'center'],
      rows: [
        ['A', '0,12', '0,28', '0,40'],
        ['Ā', '0,18', '0,42', '0,60'],
        ['Total', '0,30', '0,70', '1'],
      ],
      caption: 'Tableau de contingence : les probabilités conditionnelles se lisent à l’intérieur d’une ligne ou d’une colonne.',
    },
    formula: ['P<sub>A</sub>(B) = ' + f('0,12', '0,40') + ' = 0,3'],
    ex: 'On lit dans la ligne de A : 12 % des élèves ont A et B, sur 40 % qui ont A. La probabilité conditionnelle se lit donc sur une ligne, pas sur le total.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-methode',
    kicker: 'Probabilités conditionnelles · 6',
    title: 'Construire un arbre',
    meth: [
      'Identifier les étapes de l’expérience et les événements de chaque étape.',
      'Placer les probabilités conditionnelles sur les branches, en vérifiant que la somme des branches d’un nœud vaut 1.',
      'Multiplier le long des chemins, additionner les chemins favorables.',
    ],
    ex: 'Deux tirages sans remise dans une urne de 3 rouges et 2 bleues : au deuxième tirage, les probabilités dépendent du premier résultat.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-exemple',
    kicker: 'Probabilités conditionnelles · 7',
    title: 'Un test de dépistage',
    def: [
      'Une maladie touche 1 % de la population. Un test est positif chez 99 % des malades et chez 5 % des non-malades.',
    ],
    prop: [
      'P(M) = 0,01 ; P<sub>M</sub>(T) = 0,99 ; P<sub>M̄</sub>(T) = 0,05.',
      'P(T) = 0,01 × 0,99 + 0,99 × 0,05 = 0,0594.',
      'P<sub>T</sub>(M) = 0,0099 / 0,0594 ≈ 0,167 : un test positif ne signifie pas être malade à 99 %.',
    ],
    rem: 'C’est le piège classique : la probabilité de T sachant M n’est pas la probabilité de M sachant T.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-pieges',
    kicker: 'Probabilités conditionnelles · 8',
    title: 'Les erreurs à éviter',
    prop: [
      'P(A ∩ B) ≠ P(A) + P(B) : on multiplie pour une intersection, on ajoute pour une réunion.',
      'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      'P(A ∩ B) = P(A) × P<sub>A</sub>(B) seulement si P(A) &gt; 0.',
      'Deux événements indépendants peuvent avoir une intersection non vide.',
    ],
    ex: 'P(A) = 0,5, P(B) = 0,4 et P(A ∩ B) = 0,2 : P(A ∪ B) = 0,7, et A et B sont indépendants car 0,5 × 0,4 = 0,2.',
  });

  /* ==================== Variables aléatoires réelles ==================== */

  K.slide('variables-aleatoires', {
    id: 'va-loi',
    kicker: 'Variables aléatoires · 1',
    title: 'La loi de probabilité',
    def: [
      'Une variable aléatoire X associe un réel à chaque issue d’une expérience aléatoire.',
      'Sa loi de probabilité donne les probabilités P(X = x<sub>i</sub>) de chaque valeur possible.',
    ],
    prop: [
      'Les probabilités sont positives et leur somme vaut 1.',
      'P(X ∈ A) est la somme des probabilités des valeurs de A.',
      'La fonction de répartition est F(x) = P(X ≤ x).',
    ],
    formula: ['P(X = x<sub>i</sub>) = p<sub>i</sub>', 'p₁ + p₂ + … + p<sub>n</sub> = 1'],
  });

  K.slide('variables-aleatoires', {
    id: 'va-esperance',
    kicker: 'Variables aléatoires · 2',
    title: 'Espérance',
    def: [
      'L’espérance de X est E(X) = Σ x<sub>i</sub> p<sub>i</sub>. C’est la moyenne pondérée des valeurs par leurs probabilités.',
    ],
    prop: [
      'E(X) s’interprète comme la valeur moyenne observée sur un grand nombre d’expériences.',
      'E(X) n’est pas forcément une valeur prise par X.',
    ],
    formula: ['E(X) = Σ x<sub>i</sub> p<sub>i</sub>'],
    ex: 'X prend 0, 1, 2 avec les probabilités 0,5 ; 0,3 ; 0,2 : E(X) = 0 × 0,5 + 1 × 0,3 + 2 × 0,2 = 0,7.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-variance',
    kicker: 'Variables aléatoires · 3',
    title: 'Variance et écart type',
    def: [
      'La variance mesure la dispersion autour de l’espérance : V(X) = Σ p<sub>i</sub> (x<sub>i</sub> − E(X))².',
      'L’écart type est σ(X) = √V(X), dans la même unité que X.',
    ],
    prop: [
      'Formule de calcul : V(X) = E(X²) − (E(X))².',
      'V(X) ≥ 0, et V(X) = 0 si et seulement si X est constante.',
    ],
    formula: ['V(X) = Σ p<sub>i</sub> (x<sub>i</sub> − E(X))²', 'V(X) = E(X²) − (E(X))²'],
    ex: 'Avec l’exemple précédent, E(X²) = 0 × 0,5 + 1 × 0,3 + 4 × 0,2 = 1,1, donc V(X) = 1,1 − 0,49 = 0,61 et σ(X) ≈ 0,78.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-lineaire',
    kicker: 'Variables aléatoires · 4',
    title: 'Décaler et multiplier',
    prop: [
      'E(aX + b) = a E(X) + b.',
      'V(aX + b) = a² V(X) et σ(aX + b) = |a| σ(X).',
      'Un décalage ne change pas la dispersion ; un facteur la multiplie par |a|.',
    ],
    formula: ['E(aX + b) = a E(X) + b', 'V(aX + b) = a² V(X)'],
    ex: 'Si E(X) = 4 et V(X) = 9, alors E(2X + 1) = 9, V(2X + 1) = 36 et σ(2X + 1) = 6.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-uniforme',
    kicker: 'Variables aléatoires · 5',
    title: 'Loi uniforme sur {1 ; … ; n}',
    def: [
      'Chaque valeur de 1 à n a la même probabilité 1/n.',
    ],
    prop: [
      'E(X) = (n + 1)/2.',
      'V(X) = (n² − 1)/12.',
    ],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: 0, xmax: 7, ymin: 0, ymax: 0.6 },
        params: [{ key: 'n', label: 'n', min: 2, max: 6, step: 1, value: 4, decimals: 0 }],
        draw(p) {
          const n = p.state.n;
          const prob = 1 / n;
          for (let k = 1; k <= n; k += 1) {
            const [x0, y0] = p.map(k - 0.38, 0);
            const [x1, y1] = p.map(k + 0.38, prob);
            p.ctx.save();
            p.ctx.fillStyle = 'rgba(227, 199, 158, 0.28)';
            p.ctx.strokeStyle = C.ACCENT;
            p.ctx.lineWidth = 1.6;
            p.ctx.fillRect(x0, y1, x1 - x0, y0 - y1);
            p.ctx.strokeRect(x0, y1, x1 - x0, y0 - y1);
            p.ctx.restore();
            p.text(k, 0.03, '1/n', { color: C.MUTED, align: 'center', size: 10 });
          }
        },
        readout(s) {
          const n = s.n;
          return `E(X) = ${M.com((n + 1) / 2)} · V(X) = ${M.com((n * n - 1) / 12)}`;
        },
      });
    },
  });

  K.slide('variables-aleatoires', {
    id: 'va-bernoulli',
    kicker: 'Variables aléatoires · 6',
    title: 'Loi de Bernoulli',
    def: [
      'Une épreuve de Bernoulli a deux issues : succès (probabilité p) et échec (probabilité 1 − p).',
      'La variable X qui vaut 1 en cas de succès et 0 sinon suit la loi de Bernoulli de paramètre p.',
    ],
    formula: ['P(X = 1) = p,  P(X = 0) = 1 − p', 'E(X) = p,  V(X) = p(1 − p)'],
    ex: 'On lance un dé et on gagne si l’on obtient 6 : p = 1/6, E(X) = 1/6 et V(X) = 5/36.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-binomiale',
    kicker: 'Variables aléatoires · 7',
    title: 'Loi binomiale',
    def: [
      'On répète n fois, de façon identique et indépendante, une épreuve de Bernoulli de paramètre p. La variable X égale au nombre de succès suit la loi binomiale B(n ; p).',
    ],
    formula: ['P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup> (1 − p)<sup>n−k</sup>', 'E(X) = np,  V(X) = np(1 − p)'],
    ex: 'On lance 10 fois une pièce équilibrée : X ~ B(10 ; 0,5). P(X = 5) = C₁₀⁵ × 0,5¹⁰ = 252/1024 ≈ 0,246.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-exemple',
    kicker: 'Variables aléatoires · 8',
    title: 'Un jeu, une espérance',
    def: [
      'Un jeu coûte 2 €. On tire une carte dans un jeu de 32 : un as rapporte 10 €, une figure 4 €, sinon rien.',
    ],
    prop: [
      'X est le gain net. P(X = 8) = 4/32, P(X = 2) = 12/32, P(X = −2) = 16/32.',
      'E(X) = 8 × 0,125 + 2 × 0,375 − 2 × 0,5 = 0,75.',
      'Le jeu est favorable au joueur : il gagne en moyenne 0,75 € par partie.',
    ],
    rem: 'Une espérance positive ne garantit pas de gagner à chaque partie : elle décrit le comportement sur un grand nombre de parties.',
  });
})();
