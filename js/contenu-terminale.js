// Terminale spécialité — cours aligné sur les chapitres du manuel
// (Lelivrescolaire Terminale spécialité / Sésamath Terminale spécialité).
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;

  /* ==================== Combinatoire et dénombrement ==================== */

  K.slide('combinatoire', {
    id: 'co-principe',
    kicker: 'Combinatoire · 1',
    title: 'Le principe multiplicatif',
    def: [
      'Si une situation se décrit par une succession de choix indépendants, comportant respectivement n₁, n₂, …, n<sub>k</sub> possibilités, alors le nombre total de possibilités est n₁ × n₂ × … × n<sub>k</sub>.',
    ],
    formula: ['n₁ × n₂ × … × n<sub>k</sub>'],
    ex: 'Un menu comporte 3 entrées, 4 plats et 2 desserts : il y a 3 × 4 × 2 = 24 menus possibles.',
  });

  K.slide('combinatoire', {
    id: 'co-factorielle',
    kicker: 'Combinatoire · 2',
    title: 'Factorielle et permutations',
    def: [
      'Pour n ≥ 1, n! = 1 × 2 × … × n. On pose 0! = 1.',
      'Une permutation de n objets distincts est un ordre de ces n objets : il y en a n!.',
    ],
    formula: ['n! = n × (n − 1)!', '0! = 1'],
    ex: 'Les lettres A, B, C peuvent être rangées de 3! = 6 façons : ABC, ACB, BAC, BCA, CAB, CBA.',
  });

  K.slide('combinatoire', {
    id: 'co-arrangements',
    kicker: 'Combinatoire · 3',
    title: 'Arrangements',
    def: [
      'Un arrangement de k éléments parmi n est un choix ordonné de k éléments distincts parmi n. Son nombre est A<sub>n</sub><sup>k</sup> = n(n − 1)…(n − k + 1).',
    ],
    formula: ['A<sub>n</sub><sup>k</sup> = ' + f('n!', '(n − k)!')],
    ex: 'Un podium de 3 coureurs parmi 8 : A₈³ = 8 × 7 × 6 = 336 podiums possibles.',
  });

  K.slide('combinatoire', {
    id: 'co-combinaisons',
    kicker: 'Combinatoire · 4',
    title: 'Combinaisons',
    def: [
      'Une combinaison de k éléments parmi n est un sous-ensemble de k éléments, sans ordre. On la note C<sub>n</sub><sup>k</sup> (ou « k parmi n »).',
    ],
    formula: [
      'C<sub>n</sub><sup>k</sup> = ' + f('n!', 'k!(n − k)!'),
      'C<sub>n</sub><sup>k</sup> = C<sub>n</sub><sup>n−k</sup>',
    ],
    ex: 'Une main de 5 cartes parmi 32 : C₃₂⁵ = 201 376 mains. L’ordre du tirage ne compte pas.',
  });

  K.slide('combinatoire', {
    id: 'co-binome',
    kicker: 'Combinatoire · 5',
    title: 'Formule du binôme',
    thm: [
      'Pour tous réels a et b et tout entier n ≥ 0 : (a + b)<sup>n</sup> = Σ<sub>k=0</sub><sup>n</sup> C<sub>n</sub><sup>k</sup> a<sup>k</sup> b<sup>n−k</sup>.',
      'Les coefficients C<sub>n</sub><sup>k</sup> se lisent dans le triangle de Pascal : C<sub>n</sub><sup>k</sup> = C<sub>n−1</sub><sup>k−1</sup> + C<sub>n−1</sub><sup>k</sup>.',
    ],
    formula: ['(a + b)<sup>n</sup> = Σ C<sub>n</sub><sup>k</sup> a<sup>k</sup> b<sup>n−k</sup>'],
    ex: '(a + b)³ = a³ + 3a²b + 3ab² + b³. Les coefficients 1, 3, 3, 1 sont la ligne 3 du triangle de Pascal.',
  });

  K.slide('combinatoire', {
    id: 'co-methode',
    kicker: 'Combinatoire · 6',
    title: 'Arrangement ou combinaison ?',
    meth: [
      'L’ordre intervient-il ? Si oui, penser arrangements (ou permutations).',
      'S’il s’agit de choisir un groupe sans ordre, penser combinaisons.',
      'Séparer les cas incompatibles, puis additionner ; enchaîner les étapes indépendantes, puis multiplier.',
    ],
    ex: 'Choisir un bureau (président, trésorier) dans un groupe de 10 : arrangement, A₁₀² = 90. Choisir une délégation de 2 : combinaison, C₁₀² = 45.',
  });

  K.slide('combinatoire', {
    id: 'co-exemple',
    kicker: 'Combinatoire · 7',
    title: 'Dénombrer un mot',
    def: ['Combien de « mots » de 4 lettres distinctes peut-on former avec les lettres du mot MATHS ?'],
    prop: [
      'On choisit 4 lettres parmi 5, puis on les ordonne : C₅⁴ × 4! = 5 × 24 = 120.',
      'Autre point de vue : A₅⁴ = 5 × 4 × 3 × 2 = 120.',
    ],
    rem: 'Si les lettres pouvaient se répéter, il y aurait 5⁴ = 625 mots de 4 lettres.',
  });

  /* ==================== Vecteurs, droites et plans de l’espace ==================== */

  K.slide('espace-vecteurs', {
    id: 'ev-vecteurs',
    kicker: 'Espace · 1',
    title: 'Vecteurs de l’espace',
    def: [
      'Un vecteur de l’espace se représente par trois coordonnées dans un repère (O ; i, j, k).',
      'Les opérations (somme, multiplication par un réel) et les formules de coordonnées sont les mêmes que dans le plan, avec une troisième coordonnée.',
    ],
    formula: ['u(x ; y ; z)', 'u + v = (x + x′ ; y + y′ ; z + z′)', 'λu = (λx ; λy ; λz)'],
    ex: 'u(1 ; −2 ; 3) et v(4 ; 1 ; −1) : u + v = (5 ; −1 ; 2) et 2u − v = (−2 ; −5 ; 7).',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-colinearite',
    kicker: 'Espace · 2',
    title: 'Colinéarité et alignement',
    def: [
      'Deux vecteurs u et v sont colinéaires s’il existe un réel λ tel que u = λv (ou v = λu).',
      'Trois points A, B, C sont alignés si et seulement si AB et AC sont colinéaires.',
    ],
    prop: [
      'Si u(x ; y ; z) et v(x′ ; y′ ; z′) sont non nuls, ils sont colinéaires si et seulement si leurs coordonnées sont proportionnelles.',
    ],
    ex: 'u(2 ; −4 ; 6) et v(−1 ; 2 ; −3) : u = −2v, donc u et v sont colinéaires.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-coplanaires',
    kicker: 'Espace · 3',
    title: 'Vecteurs coplanaires',
    def: [
      'Trois vecteurs u, v, w sont coplanaires si, après avoir choisi un point O, les points O, A, B, C avec OA = u, OB = v, OC = w sont dans un même plan.',
      'Si u et v ne sont pas colinéaires, w est coplanaire à u et v si et seulement si w = a u + b v pour deux réels a et b.',
    ],
    formula: ['w = a u + b v'],
    ex: 'u(1 ; 0 ; 1), v(0 ; 1 ; 1) et w(2 ; 3 ; 5) : w = 2u + 3v, donc les trois vecteurs sont coplanaires.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-droite-plan',
    kicker: 'Espace · 4',
    title: 'Droites et plans',
    def: [
      'Une droite est déterminée par un point et un vecteur directeur non nul.',
      'Un plan est déterminé par un point et deux vecteurs non colinéaires (ou par trois points non alignés).',
      'Deux droites sont coplanaires si elles sont contenues dans un même plan.',
    ],
    formula: ['droite : A + t u', 'plan : A + s u + t v'],
  });

  K.slide('espace-vecteurs', {
    id: 'ev-positions',
    kicker: 'Espace · 5',
    title: 'Positions relatives',
    prop: [
      'Deux droites de l’espace sont sécantes, strictement parallèles, confondues, ou non coplanaires.',
      'Une droite et un plan sont sécants en un point, ou parallèles (droite incluse dans le plan ou strictement parallèle).',
      'Deux plans sont sécants selon une droite, ou parallèles (confondus ou strictement parallèles).',
    ],
    ex: 'Dans un cube, les arêtes [AB] et [HG] sont parallèles ; [AB] et [CG] ne sont ni sécantes ni parallèles : elles sont non coplanaires.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-reperage',
    kicker: 'Espace · 6',
    title: 'Repérage dans l’espace',
    prop: [
      'Si A(x<sub>A</sub> ; y<sub>A</sub> ; z<sub>A</sub>) et B(x<sub>B</sub> ; y<sub>B</sub> ; z<sub>B</sub>), alors AB(x<sub>B</sub> − x<sub>A</sub> ; y<sub>B</sub> − y<sub>A</sub> ; z<sub>B</sub> − z<sub>A</sub>).',
      'Le milieu I de [AB] a pour coordonnées les moyennes des coordonnées de A et B.',
      'La distance AB vaut √((x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)² + (z<sub>B</sub> − z<sub>A</sub>)²).',
    ],
    formula: ['AB = √(Δx² + Δy² + Δz²)', 'I = ((x<sub>A</sub> + x<sub>B</sub>)/2 ; …)'],
    ex: 'A(1 ; 2 ; 3) et B(3 ; 5 ; 7) : AB = √(4 + 9 + 16) = √29. Le milieu est I(2 ; 3,5 ; 5).',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-parametrique',
    kicker: 'Espace · 7',
    title: 'Représentation paramétrique d’une droite',
    prop: [
      'La droite passant par A(x₀ ; y₀ ; z₀) et de vecteur directeur u(a ; b ; c) est l’ensemble des points M(x ; y ; z) tels que AM = t u, t ∈ ℝ.',
    ],
    formula: ['x = x₀ + t a', 'y = y₀ + t b', 'z = z₀ + t c'],
    ex: 'Droite passant par A(1 ; −2 ; 0) et de vecteur u(2 ; 1 ; −3) : x = 1 + 2t, y = −2 + t, z = −3t. Pour t = 1, le point (3 ; −1 ; −3) est sur la droite.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-plan-equation',
    kicker: 'Espace · 8',
    title: 'Équation cartésienne d’un plan',
    thm: [
      'Un plan de vecteur normal n(a ; b ; c) non nul a une équation de la forme ax + by + cz + d = 0. Réciproquement, une telle équation avec (a ; b ; c) ≠ (0 ; 0 ; 0) définit un plan.',
    ],
    prop: [
      'Un vecteur normal au plan est orthogonal à tous les vecteurs du plan.',
      'Pour trouver d, on remplace x, y, z par les coordonnées d’un point du plan.',
    ],
    ex: 'Plan passant par A(1 ; 2 ; 3) de normale n(2 ; −1 ; 4) : 2x − y + 4z + d = 0, et 2 − 2 + 12 + d = 0 donne d = −12.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-figure',
    kicker: 'Espace · 9',
    title: 'Voir un cube en perspective',
    formula: ['repère (O ; i, j, k)'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 3.5, ymin: -1, ymax: 3.5 },
        params: [],
        draw(p) {
          const proj = (x, y, z) => [x + 0.45 * z, y + 0.3 * z];
          const corners = [
            [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
            [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
          ];
          const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
          ];
          edges.forEach(([i, j]) => {
            const A = proj(...corners[i]);
            const B = proj(...corners[j]);
            p.line(A[0], A[1], B[0], B[1], {
              color: j >= 4 ? 'rgba(246, 241, 232, 0.35)' : 'rgba(246, 241, 232, 0.6)',
              width: 1.6,
            });
          });
          p.line(0, 0, 1.7, 0, { color: C.RED, width: 2 });
          p.line(0, 0, 0, 1.7, { color: C.GREEN, width: 2 });
          p.line(0, 0, 0.7, 0.5, { color: C.BLUE, width: 2 });
          p.text(1.7, 0, 'i', { color: C.RED, dy: -10 });
          p.text(0, 1.7, 'j', { color: C.GREEN, dx: 8 });
          p.text(0.7, 0.5, 'k', { color: C.BLUE, dx: 8 });
        },
      });
    },
  });

  /* ==================== Orthogonalité et distances dans l’espace ==================== */

  K.slide('espace-orthogonalite', {
    id: 'eo-orthogonalite',
    kicker: 'Orthogonalité · 1',
    title: 'Droites et plans orthogonaux',
    def: [
      'Deux droites sont orthogonales si leurs vecteurs directeurs sont orthogonaux, même si elles ne se coupent pas.',
      'Une droite est orthogonale à un plan si elle est orthogonale à toutes les droites du plan.',
    ],
    thm: [
      'Une droite est orthogonale à un plan si et seulement si elle est orthogonale à deux droites sécantes de ce plan.',
    ],
    ex: 'Dans un cube, l’arête [AE] est orthogonale au plan (ABCD) ; elle est orthogonale à [AB] et [AD], qui sont sécantes.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-produit-scalaire',
    kicker: 'Orthogonalité · 2',
    title: 'Produit scalaire dans l’espace',
    def: [
      'Dans un repère orthonormé, le produit scalaire de u(x ; y ; z) et v(x′ ; y′ ; z′) est u · v = xx′ + yy′ + zz′.',
    ],
    prop: [
      'u ⊥ v ⟺ u · v = 0.',
      '‖u‖² = u · u = x² + y² + z².',
      'Les propriétés de symétrie et de linéarité restent valables.',
    ],
    formula: ['u · v = xx′ + yy′ + zz′', 'u ⊥ v ⟺ u · v = 0'],
    ex: 'u(1 ; 2 ; −1) et v(3 ; 0 ; 3) : u · v = 3 + 0 − 3 = 0, donc u ⊥ v.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-vecteur-normal',
    kicker: 'Orthogonalité · 3',
    title: 'Vecteur normal et plan',
    prop: [
      'Un vecteur n non nul est normal à un plan P s’il est orthogonal à deux vecteurs non colinéaires de P.',
      'Le plan passant par A et de normale n(a ; b ; c) a pour équation ax + by + cz + d = 0.',
      'Deux plans sont parallèles si et seulement si leurs vecteurs normaux sont colinéaires.',
    ],
    ex: 'Le plan d’équation 2x − y + 3z − 4 = 0 a pour normale n(2 ; −1 ; 3). Le plan 4x − 2y + 6z + 1 = 0 lui est parallèle.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-distance-plan',
    kicker: 'Orthogonalité · 4',
    title: 'Distance d’un point à un plan',
    thm: [
      'La distance du point M(x₀ ; y₀ ; z₀) au plan P d’équation ax + by + cz + d = 0 est la longueur MH, où H est le projeté orthogonal de M sur P. Elle vaut |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²).',
    ],
    formula: ['d(M, P) = ' + f('|ax₀ + by₀ + cz₀ + d|', '√(a² + b² + c²)')],
    ex: 'Distance de M(1 ; 1 ; 1) au plan x + 2y + 2z − 3 = 0 : |1 + 2 + 2 − 3|/3 = 2/3.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-distance-droite',
    kicker: 'Orthogonalité · 5',
    title: 'Projeté orthogonal et distance à une droite',
    def: [
      'Le projeté orthogonal H de M sur la droite d est l’intersection de d avec le plan perpendiculaire à d passant par M.',
      'La distance de M à d est MH, la plus courte distance entre M et un point de d.',
    ],
    meth: [
      'Écrire une représentation paramétrique de d.',
      'Écrire l’équation du plan passant par M et de normale le vecteur directeur de d.',
      'Substituer pour trouver le paramètre de H, puis calculer MH.',
    ],
    ex: 'M(1 ; 2 ; 3) et d passant par A(0 ; 0 ; 0) de vecteur u(1 ; 0 ; 0) : H(1 ; 0 ; 0) et MH = √13.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-sphere',
    kicker: 'Orthogonalité · 6',
    title: 'Sphère',
    def: [
      'La sphère de centre Ω(a ; b ; c) et de rayon R est l’ensemble des points M tels que ΩM = R.',
      'Son équation est (x − a)² + (y − b)² + (z − c)² = R².',
    ],
    prop: [
      'L’intersection d’un plan et d’une sphère est un cercle, un point (plan tangent) ou l’ensemble vide.',
      'La distance du centre au plan permet de trouver le rayon du cercle d’intersection : r² = R² − d².',
    ],
    ex: 'Sphère de centre O et de rayon 3 : x² + y² + z² = 9. Le plan z = 0 la coupe selon le cercle x² + y² = 9.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-methode',
    kicker: 'Orthogonalité · 7',
    title: 'Montrer une orthogonalité',
    meth: [
      'Choisir un repère adapté (souvent un cube ou un pavé droit).',
      'Calculer les coordonnées des vecteurs concernés.',
      'Calculer leur produit scalaire : s’il est nul, les droites sont orthogonales.',
      'Pour un plan, vérifier l’orthogonalité avec deux vecteurs non colinéaires du plan.',
    ],
    ex: 'Dans un cube ABCDEFGH, AE · BD = 0 car AE est vertical et BD horizontal : l’arête [AE] est orthogonale à la diagonale [BD] de la base.',
  });

  /* ==================== Suites ==================== */

  K.slide('suites-limites', {
    id: 'sl-limite-finie',
    kicker: 'Suites · 1',
    title: 'Limite finie',
    def: [
      'La suite (u<sub>n</sub>) converge vers le réel ℓ si tout intervalle ouvert contenant ℓ contient tous les termes de la suite à partir d’un certain rang.',
      'On note lim<sub>n→+∞</sub> u<sub>n</sub> = ℓ.',
    ],
    prop: [
      'La limite, si elle existe, est unique.',
      'Une suite qui n’a pas de limite finie diverge.',
      'Toute suite convergente est bornée.',
    ],
    formula: ['|u<sub>n</sub> − ℓ| devient aussi petit que voulu'],
    ex: 'u<sub>n</sub> = 1/n converge vers 0 ; u<sub>n</sub> = (−1)<sup>n</sup> diverge (elle oscille).',
  });

  K.slide('suites-limites', {
    id: 'sl-limite-infinie',
    kicker: 'Suites · 2',
    title: 'Limite infinie',
    def: [
      'La suite (u<sub>n</sub>) tend vers +∞ si tout intervalle ]A ; +∞[ contient tous les termes à partir d’un certain rang. On définit de même −∞.',
    ],
    prop: [
      'Si u<sub>n</sub> → +∞, alors u<sub>n</sub> est positive à partir d’un certain rang.',
      'Une suite croissante non majorée tend vers +∞ ; une suite décroissante non minorée tend vers −∞.',
    ],
    ex: 'u<sub>n</sub> = n² → +∞ ; v<sub>n</sub> = −√n → −∞ ; w<sub>n</sub> = n + (−1)<sup>n</sup> → +∞.',
  });

  K.slide('suites-limites', {
    id: 'sl-operations',
    kicker: 'Suites · 3',
    title: 'Opérations sur les limites',
    prop: [
      'La limite d’une somme, d’un produit ou d’un quotient se calcule par les règles usuelles lorsque les limites existent.',
      'Les formes indéterminées sont : ∞ − ∞, 0 × ∞, ∞/∞, 0/0.',
      'Pour lever une indétermination, on factorise par le terme dominant, on multiplie par la quantité conjuguée ou on utilise les croissances comparées.',
    ],
    formula: ['lim (u<sub>n</sub> + v<sub>n</sub>) = lim u<sub>n</sub> + lim v<sub>n</sub>'],
    ex: '(n² − n)/(2n² + 1) = (1 − 1/n)/(2 + 1/n²) → 1/2.',
  });

  K.slide('suites-limites', {
    id: 'sl-comparaison',
    kicker: 'Suites · 4',
    title: 'Théorèmes de comparaison',
    thm: [
      'Gendarmes : si u<sub>n</sub> ≤ v<sub>n</sub> ≤ w<sub>n</sub> à partir d’un certain rang, et si u<sub>n</sub> et w<sub>n</sub> tendent vers le même réel ℓ, alors v<sub>n</sub> → ℓ.',
      'Si u<sub>n</sub> ≤ v<sub>n</sub> et u<sub>n</sub> → +∞, alors v<sub>n</sub> → +∞. Si v<sub>n</sub> ≤ u<sub>n</sub> et v<sub>n</sub> → −∞, alors u<sub>n</sub> → −∞.',
    ],
    formula: ['u<sub>n</sub> ≤ v<sub>n</sub> ≤ w<sub>n</sub>,  u<sub>n</sub> → ℓ,  w<sub>n</sub> → ℓ  ⟹  v<sub>n</sub> → ℓ'],
    ex: 'v<sub>n</sub> = sin(n)/n : −1/n ≤ v<sub>n</sub> ≤ 1/n, donc v<sub>n</sub> → 0.',
  });

  K.slide('suites-limites', {
    id: 'sl-monotone',
    kicker: 'Suites · 5',
    title: 'Convergence monotone',
    thm: [
      'Une suite croissante et majorée converge. Une suite décroissante et minorée converge.',
      'Si une suite est croissante et non majorée, elle tend vers +∞.',
    ],
    rem: 'Le théorème donne l’existence de la limite, pas sa valeur. On l’encadre souvent par les termes extrêmes.',
    ex: 'u₀ = 1 et u<sub>n+1</sub> = u<sub>n</sub> + 1/2<sup>n</sup> : la suite est croissante et majorée par 2, donc elle converge.',
  });

  K.slide('suites-limites', {
    id: 'sl-recurrence',
    kicker: 'Suites · 6',
    title: 'Le raisonnement par récurrence',
    meth: [
      'Initialisation : vérifier la propriété au rang de départ n₀.',
      'Hérédité : supposer la propriété vraie au rang n et démontrer qu’elle est vraie au rang n + 1.',
      'Conclusion : la propriété est vraie pour tout n ≥ n₀.',
    ],
    ex: 'Montrer que u<sub>n</sub> = 2<sup>n</sup> − 1 pour u₀ = 0 et u<sub>n+1</sub> = 2u<sub>n</sub> + 1 : vrai en 0, et 2(2<sup>n</sup> − 1) + 1 = 2<sup>n+1</sup> − 1.',
  });

  K.slide('suites-limites', {
    id: 'sl-geometrique',
    kicker: 'Suites · 7',
    title: 'Suites géométriques et limites',
    prop: [
      'Si |q| &lt; 1, alors q<sup>n</sup> → 0.',
      'Si q &gt; 1, alors q<sup>n</sup> → +∞.',
      'Si q = 1, q<sup>n</sup> = 1 ; si q ≤ −1, q<sup>n</sup> n’a pas de limite.',
    ],
    formula: ['u<sub>n</sub> = u₀ q<sup>n</sup>  ⟹  lim u<sub>n</sub> = 0 si |q| &lt; 1'],
    ex: 'u<sub>n</sub> = 5 × 0,8<sup>n</sup> → 0 ; v<sub>n</sub> = 3 × 1,1<sup>n</sup> → +∞.',
  });

  K.slide('suites-limites', {
    id: 'sl-exemple',
    kicker: 'Suites · 8',
    title: 'Une suite récurrente',
    def: ['u₀ = 0 et u<sub>n+1</sub> = (u<sub>n</sub> + 2)/3.'],
    prop: [
      'La suite est croissante : u<sub>n+1</sub> − u<sub>n</sub> = (2 − 2u<sub>n</sub>)/3, et u<sub>n</sub> ≤ 2 par récurrence.',
      'Majorée et croissante, elle converge. Sa limite ℓ vérifie ℓ = (ℓ + 2)/3, donc ℓ = 1.',
      'En posant v<sub>n</sub> = u<sub>n</sub> − 1, on obtient v<sub>n+1</sub> = v<sub>n</sub>/3, donc u<sub>n</sub> = 1 − (1/3)<sup>n</sup>.',
    ],
    ex: 'u₁ ≈ 0,667 ; u₂ ≈ 0,889 ; u₃ ≈ 0,963 : la suite s’approche bien de 1.',
  });

  /* ==================== Limites de fonctions ==================== */

  K.slide('limites-fonctions', {
    id: 'lf-infini',
    kicker: 'Limites · 1',
    title: 'Limite à l’infini',
    def: [
      'lim<sub>x→+∞</sub> f(x) = ℓ si f(x) devient aussi proche que voulu de ℓ pour x assez grand.',
      'lim<sub>x→+∞</sub> f(x) = +∞ si f(x) dépasse tout nombre A pour x assez grand.',
    ],
    formula: ['lim<sub>x→+∞</sub> f(x) = ℓ', 'lim<sub>x→+∞</sub> f(x) = +∞'],
    ex: 'lim<sub>x→+∞</sub> 1/x = 0 ; lim<sub>x→+∞</sub> x² = +∞ ; lim<sub>x→+∞</sub> (3 + 1/x) = 3.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-point',
    kicker: 'Limites · 2',
    title: 'Limite en un point',
    def: [
      'lim<sub>x→a</sub> f(x) = ℓ si f(x) tend vers ℓ lorsque x tend vers a, par valeurs inférieures ou supérieures.',
      'On distingue les limites à gauche et à droite lorsque le comportement diffère.',
    ],
    formula: ['lim<sub>x→a<sup>−</sup></sub> f(x)', 'lim<sub>x→a<sup>+</sup></sub> f(x)'],
    ex: 'f(x) = 1/x : lim<sub>x→0<sup>−</sup></sub> f(x) = −∞ et lim<sub>x→0<sup>+</sup></sub> f(x) = +∞. La limite en 0 n’existe pas.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-asymptotes',
    kicker: 'Limites · 3',
    title: 'Asymptotes',
    def: [
      'Si lim<sub>x→±∞</sub> f(x) = ℓ, la droite y = ℓ est une asymptote horizontale.',
      'Si lim<sub>x→a</sub> |f(x)| = +∞, la droite x = a est une asymptote verticale.',
      'Si f(x) − (ax + b) → 0 en ±∞, la droite y = ax + b est une asymptote oblique.',
    ],
    formula: ['f(x) − ℓ → 0 ⟹ y = ℓ', '|f(x)| → +∞ en a ⟹ x = a'],
    ex: 'f(x) = (2x + 1)/(x − 1) = 2 + 3/(x − 1) : asymptote horizontale y = 2 et verticale x = 1.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-operations',
    kicker: 'Limites · 4',
    title: 'Opérations et indéterminations',
    prop: [
      'Les limites de somme, produit, quotient et composée suivent les règles usuelles.',
      'Formes indéterminées : ∞ − ∞, 0 × ∞, ∞/∞, 0/0.',
      'On lève l’indétermination en factorisant par le terme dominant, en utilisant la quantité conjuguée ou un taux de variation.',
    ],
    ex: 'lim<sub>x→+∞</sub> (√(x² + 1) − x) : multiplier par la conjuguée donne 1/(√(x² + 1) + x) → 0.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-croissances',
    kicker: 'Limites · 5',
    title: 'Croissances comparées',
    thm: [
      'En +∞, l’exponentielle l’emporte sur toute puissance, qui l’emporte sur le logarithme.',
    ],
    formula: [
      'lim<sub>x→+∞</sub> ' + f('e<sup>x</sup>', 'x<sup>n</sup>') + ' = +∞',
      'lim<sub>x→+∞</sub> ' + f('ln x', 'x<sup>n</sup>') + ' = 0',
      'lim<sub>x→+∞</sub> x<sup>n</sup> e<sup>−x</sup> = 0',
    ],
    ex: 'lim<sub>x→+∞</sub> x e<sup>−x</sup> = 0 ; lim<sub>x→+∞</sub> (ln x)/x = 0 ; lim<sub>x→+∞</sub> e<sup>x</sup>/x² = +∞.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-composee',
    kicker: 'Limites · 6',
    title: 'Limite d’une composée',
    thm: [
      'Si lim<sub>x→a</sub> u(x) = b et lim<sub>t→b</sub> f(t) = ℓ, alors lim<sub>x→a</sub> f(u(x)) = ℓ, sous réserve que les limites existent.',
    ],
    formula: ['lim<sub>x→a</sub> f(u(x)) = lim<sub>t→b</sub> f(t)'],
    ex: 'lim<sub>x→+∞</sub> e<sup>−x²</sup> : u = −x² → −∞ et e<sup>t</sup> → 0 en −∞, donc la limite est 0.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-monotone',
    kicker: 'Limites · 7',
    title: 'Limite d’une fonction monotone',
    thm: [
      'Si f est croissante et majorée sur ]a ; +∞[, alors f admet une limite finie en +∞.',
      'Si f est croissante et non majorée, alors f(x) → +∞.',
    ],
    ex: 'f(x) = 1 − e<sup>−x</sup> est croissante et majorée par 1 sur ℝ : elle admet une limite finie 1 en +∞.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-figure',
    kicker: 'Limites · 8',
    title: 'Asymptote horizontale',
    formula: ['f(x) = ' + f('a x', 'x + 1')],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -8, xmax: 8, ymin: -4, ymax: 6 },
        params: [{ key: 'a', label: 'a', min: -3, max: 4, step: 0.5, value: 2, decimals: 1 }],
        draw(p) {
          const a = p.state.a;
          p.plot((x) => (a * x) / (x + 1));
          p.hline(a, { color: 'rgba(124, 176, 255, 0.5)', dash: [6, 5] });
          p.vline(-1, { color: 'rgba(224, 140, 124, 0.5)', dash: [6, 5] });
          p.text(6, a, 'y = a', { color: C.BLUE, dy: -10 });
        },
      });
    },
  });

  /* ==================== Continuité ==================== */

  K.slide('continuite', {
    id: 'ct-definition',
    kicker: 'Continuité · 1',
    title: 'Continuité en un point',
    def: [
      'f est continue en a si lim<sub>x→a</sub> f(x) = f(a).',
      'f est continue sur un intervalle si elle est continue en chaque point de cet intervalle.',
    ],
    prop: [
      'Les fonctions usuelles (polynômes, racine, inverse, exponentielle, logarithme, cos, sin) sont continues sur leur domaine.',
      'Somme, produit, quotient et composée de fonctions continues sont continus sur leur domaine.',
    ],
    formula: ['lim<sub>x→a</sub> f(x) = f(a)'],
    ex: 'La fonction partie entière n’est pas continue en les entiers : sa limite à gauche diffère de sa valeur.',
  });

  K.slide('continuite', {
    id: 'ct-tvi',
    kicker: 'Continuité · 2',
    title: 'Théorème des valeurs intermédiaires',
    thm: [
      'Si f est continue sur [a ; b] et si k est compris entre f(a) et f(b), alors il existe au moins un réel c dans [a ; b] tel que f(c) = k.',
      'Autrement dit, une fonction continue sur un intervalle prend toutes les valeurs intermédiaires.',
    ],
    formula: ['f continue sur [a ; b]  ⟹  f([a ; b]) est un intervalle'],
    ex: 'f(x) = x³ − 3x + 1 est continue ; f(0) = 1 et f(1) = −1, donc l’équation f(x) = 0 a une solution dans ]0 ; 1[.',
  });

  K.slide('continuite', {
    id: 'ct-unicite',
    kicker: 'Continuité · 3',
    title: 'Unicité de la solution',
    thm: [
      'Si f est continue et strictement monotone sur [a ; b], alors pour tout k compris entre f(a) et f(b), l’équation f(x) = k admet une unique solution dans [a ; b].',
    ],
    rem: 'La stricte monotonie est indispensable pour l’unicité : sans elle, il peut y avoir plusieurs solutions.',
    ex: 'f(x) = x³ + x est continue et strictement croissante sur ℝ ; f(0) = 0 et f(1) = 2, donc f(x) = 1 a une unique solution dans ]0 ; 1[ (x ≈ 0,682).',
  });

  K.slide('continuite', {
    id: 'ct-dichotomie',
    kicker: 'Continuité · 4',
    title: 'Dichotomie',
    meth: [
      'Partir d’un intervalle [a ; b] où f change de signe.',
      'Calculer f(m) au milieu m = (a + b)/2.',
      'Garder la moitié d’intervalle où le signe change.',
      'Répéter jusqu’à obtenir la précision voulue : la longueur est divisée par 2 à chaque étape.',
    ],
    formula: ['largeur finale = ' + f('b − a', '2<sup>n</sup>')],
    ex: 'Pour f(x) = x³ + x − 1 sur [0 ; 1], trois dichotomies donnent 0,5 puis 0,75 puis 0,625 : la racine est entre 0,625 et 0,75.',
  });

  K.slide('continuite', {
    id: 'ct-signe',
    kicker: 'Continuité · 5',
    title: 'Continuité et signe',
    thm: [
      'Si f est continue en a et f(a) &gt; 0, alors f reste strictement positive sur un intervalle autour de a. De même si f(a) &lt; 0.',
    ],
    prop: [
      'Si f est continue sur [a ; b] et ne s’annule jamais, elle garde un signe constant.',
      'Pour étudier le signe d’une fonction continue, on cherche ses zéros et on teste un point dans chaque intervalle.',
    ],
    ex: 'f(x) = x² + 1 est continue et ne s’annule jamais ; comme f(0) = 1 &gt; 0, elle est positive partout.',
  });

  K.slide('continuite', {
    id: 'ct-image',
    kicker: 'Continuité · 6',
    title: 'Image d’un intervalle',
    thm: [
      'L’image d’un intervalle par une fonction continue est un intervalle.',
      'Si f est continue sur un intervalle fermé borné [a ; b], alors f est bornée et atteint ses bornes : il existe c et d tels que f(c) soit le minimum et f(d) le maximum.',
    ],
    formula: ['f([a ; b]) = [m ; M]'],
    ex: 'f(x) = x² sur [−1 ; 2] : l’image est [0 ; 4]. Le minimum 0 est atteint en 0, le maximum 4 en 2.',
  });

  K.slide('continuite', {
    id: 'ct-figure',
    kicker: 'Continuité · 7',
    title: 'Compter les solutions',
    formula: ['f(x) = k  ⟺  f(x) − k = 0'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -3, xmax: 3, ymin: -3, ymax: 5 },
        params: [{ key: 'k', label: 'niveau k', min: -3, max: 4, step: 0.1, value: 1 }],
        draw(p) {
          const fn = (x) => x * x * x - 3 * x + 1;
          p.plot(fn);
          const k = p.state.k;
          p.hline(k, { color: 'rgba(124, 176, 255, 0.55)', dash: [6, 5] });
          let previous = fn(-3) - k;
          for (let i = 1; i <= 600; i += 1) {
            const x = -3 + (6 * i) / 600;
            const value = fn(x) - k;
            if (previous === 0 || previous * value < 0) {
              p.dot(x, k, { color: C.BLUE, r: 4.5 });
            }
            previous = value;
          }
        },
        readout(s) {
          let count = 0;
          let previous = -27 + 9 + 1 - s.k;
          for (let i = 1; i <= 600; i += 1) {
            const x = -3 + (6 * i) / 600;
            const value = x * x * x - 3 * x + 1 - s.k;
            if (previous * value < 0) count += 1;
            previous = value;
          }
          return `${count} solution${count > 1 ? 's' : ''} sur [−3 ; 3]`;
        },
      });
    },
  });

  K.slide('continuite', {
    id: 'ct-exemple',
    kicker: 'Continuité · 8',
    title: 'Étudier une équation paramétrique',
    def: ['Pour tout réel m, on cherche le nombre de solutions de x³ − 3x = m.'],
    prop: [
      'La fonction f(x) = x³ − 3x est continue, avec un maximum local 2 en −1 et un minimum local −2 en 1.',
      'Si m &lt; −2 ou m &gt; 2 : une solution.',
      'Si m = ±2 : deux solutions ; si −2 &lt; m &lt; 2 : trois solutions.',
    ],
    rem: 'Le tableau de variations et la continuité suffisent : chaque intervalle de monotonie donne au plus une solution, et le TVI en donne au moins une.',
  });

  /* ==================== Compléments sur la dérivation ==================== */

  K.slide('derivation-convexite', {
    id: 'dc-rappels',
    kicker: 'Dérivation · 1',
    title: 'Dérivée d’une composée',
    prop: [
      '(u ∘ v)′ = v′ × u′(v).',
      '(u<sup>n</sup>)′ = n u′ u<sup>n−1</sup> ; (√u)′ = u′/(2√u) ; (e<sup>u</sup>)′ = u′ e<sup>u</sup> ; (ln u)′ = u′/u.',
    ],
    formula: ['(u ∘ v)′ = v′ × u′(v)'],
    ex: 'f(x) = √(x² + 1) : f′(x) = 2x/(2√(x² + 1)) = x/√(x² + 1).',
  });

  K.slide('derivation-convexite', {
    id: 'dc-seconde',
    kicker: 'Dérivation · 2',
    title: 'Dérivée seconde',
    def: [
      'Si f′ est dérivable, sa dérivée est f″, la dérivée seconde de f.',
      'f″ mesure la variation de la pente : elle indique si la courbe tourne sa concavité vers le haut ou vers le bas.',
    ],
    formula: ['f″ = (f′)′'],
    ex: 'f(x) = x³ − 3x : f′(x) = 3x² − 3, f″(x) = 6x.',
  });

  K.slide('derivation-convexite', {
    id: 'dc-convexite',
    kicker: 'Dérivation · 3',
    title: 'Convexité',
    def: [
      'f est convexe sur I si sa courbe est au-dessus de ses cordes : pour tous a &lt; b et tout t ∈ [0 ; 1], f((1 − t)a + tb) ≤ (1 − t)f(a) + t f(b).',
      'f est concave si −f est convexe.',
    ],
    thm: [
      'Si f est deux fois dérivable sur I : f est convexe ⟺ f″ ≥ 0 sur I ; f est concave ⟺ f″ ≤ 0 sur I.',
    ],
    formula: ['f convexe ⟺ f″ ≥ 0', 'f concave ⟺ f″ ≤ 0'],
  });

  K.slide('derivation-convexite', {
    id: 'dc-tangentes',
    kicker: 'Dérivation · 4',
    title: 'Convexité et tangentes',
    prop: [
      'Si f est convexe, sa courbe est au-dessus de toutes ses tangentes.',
      'Si f est concave, sa courbe est en dessous de toutes ses tangentes.',
    ],
    formula: ['f convexe ⟹ f(x) ≥ f(a) + f′(a)(x − a)'],
    ex: 'e<sup>x</sup> est convexe (dérivée seconde e<sup>x</sup> &gt; 0), donc e<sup>x</sup> ≥ 1 + x pour tout x (tangente en 0).',
  });

  K.slide('derivation-convexite', {
    id: 'dc-inflexion',
    kicker: 'Dérivation · 5',
    title: 'Point d’inflexion',
    def: [
      'Un point d’inflexion est un point où la courbe traverse sa tangente et où la convexité change.',
    ],
    prop: [
      'Si f″ s’annule et change de signe en a, alors le point d’abscisse a est un point d’inflexion.',
      'Si f″ s’annule sans changer de signe, ce n’est pas un point d’inflexion.',
    ],
    ex: 'f(x) = x³ : f″(x) = 6x s’annule et change de signe en 0, donc O est un point d’inflexion.',
  });

  K.slide('derivation-convexite', {
    id: 'dc-inegalites',
    kicker: 'Dérivation · 6',
    title: 'Utiliser la convexité',
    meth: [
      'Calculer f″ et étudier son signe.',
      'En déduire les intervalles de convexité et les points d’inflexion.',
      'Écrire l’équation d’une tangente et utiliser sa position par rapport à la courbe pour prouver une inégalité.',
    ],
    ex: 'ln x est concave (f″ = −1/x² &lt; 0), donc ln x ≤ x − 1 pour tout x &gt; 0, avec égalité en 1.',
  });

  K.slide('derivation-convexite', {
    id: 'dc-figure',
    kicker: 'Dérivation · 7',
    title: 'Deux inflexions possibles',
    formula: ['f(x) = ' + f('x⁴', '4') + ' − ' + f('a x²', '2')],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -3, xmax: 3, ymin: -3, ymax: 6 },
        params: [{ key: 'a', label: 'a', min: -2, max: 4, step: 0.1, value: 1 }],
        draw(p) {
          const a = p.state.a;
          const fn = (x) => (x * x * x * x) / 4 - (a * x * x) / 2;
          p.plot(fn);
          if (a > 0) {
            const root = Math.sqrt(a / 3);
            p.dot(-root, fn(-root), { color: C.BLUE, r: 4.5, label: 'I₁' });
            p.dot(root, fn(root), { color: C.BLUE, r: 4.5, label: 'I₂' });
          }
        },
        readout(s) {
          if (s.a <= 0) return 'convexe partout (a ≤ 0)';
          return `inflexions en x = ± ${M.com(Math.sqrt(s.a / 3))}`;
        },
      });
    },
  });

  K.slide('derivation-convexite', {
    id: 'dc-exemple',
    kicker: 'Dérivation · 8',
    title: 'Étude complète de convexité',
    def: ['f(x) = x e<sup>−x</sup> sur ℝ.'],
    prop: [
      'f′(x) = (1 − x)e<sup>−x</sup> ; f″(x) = (x − 2)e<sup>−x</sup>.',
      'f″ &lt; 0 sur ]−∞ ; 2[, f″ &gt; 0 sur ]2 ; +∞[ : f est concave puis convexe.',
      'Le point d’abscisse 2 est un point d’inflexion, avec f(2) = 2e<sup>−2</sup>.',
    ],
    ex: 'La courbe est en dessous de ses tangentes avant 2, au-dessus après 2 : la concavité change bien en 2.',
  });

  /* ==================== Logarithme népérien ==================== */

  K.slide('logarithme', {
    id: 'log-definition',
    kicker: 'Logarithme · 1',
    title: 'Le logarithme népérien',
    def: [
      'La fonction logarithme népérien, notée ln, est la fonction réciproque de l’exponentielle : pour x &gt; 0, ln x est l’unique réel y tel que e<sup>y</sup> = x.',
      'Elle est définie sur ]0 ; +∞[.',
    ],
    prop: [
      'ln(e<sup>x</sup>) = x pour tout x ; e<sup>ln x</sup> = x pour tout x &gt; 0.',
      'ln 1 = 0 et ln e = 1.',
    ],
    formula: ['y = ln x ⟺ e<sup>y</sup> = x'],
    ex: 'ln 1 = 0 ; ln e = 1 ; ln(e²) = 2 ; e<sup>ln 5</sup> = 5.',
  });

  K.slide('logarithme', {
    id: 'log-proprietes',
    kicker: 'Logarithme · 2',
    title: 'Propriétés algébriques',
    prop: [
      'ln(ab) = ln a + ln b.',
      'ln(a/b) = ln a − ln b.',
      'ln(a<sup>n</sup>) = n ln a ; ln(1/a) = −ln a ; ln(√a) = (1/2)ln a.',
      'ln a = ln b ⟺ a = b ; ln a &lt; ln b ⟺ a &lt; b.',
    ],
    ex: 'ln 12 = ln 3 + ln 4 = ln 3 + 2 ln 2. ln(1/8) = −3 ln 2.',
  });

  K.slide('logarithme', {
    id: 'log-derivee',
    kicker: 'Logarithme · 3',
    title: 'Dérivée du logarithme',
    prop: [
      '(ln x)′ = 1/x sur ]0 ; +∞[.',
      'Pour u &gt; 0 et dérivable, (ln u)′ = u′/u.',
    ],
    formula: ['(ln x)′ = ' + f('1', 'x'), '(ln u)′ = ' + f('u′', 'u')],
    ex: 'f(x) = ln(x² + 1) : f′(x) = 2x/(x² + 1). g(x) = ln(3x − 1) : g′(x) = 3/(3x − 1), pour x &gt; 1/3.',
  });

  K.slide('logarithme', {
    id: 'log-limites',
    kicker: 'Logarithme · 4',
    title: 'Limites et variations',
    prop: [
      'lim<sub>x→0⁺</sub> ln x = −∞ : l’axe des ordonnées est une asymptote verticale.',
      'lim<sub>x→+∞</sub> ln x = +∞, mais très lentement.',
      'ln est strictement croissante sur ]0 ; +∞[.',
    ],
    formula: ['lim<sub>x→0⁺</sub> ln x = −∞', 'lim<sub>x→+∞</sub> ln x = +∞'],
    ex: 'La courbe coupe l’axe des abscisses en 1 ; elle est en dessous pour 0 &lt; x &lt; 1 et au-dessus pour x &gt; 1.',
  });

  K.slide('logarithme', {
    id: 'log-croissances',
    kicker: 'Logarithme · 5',
    title: 'Croissances comparées',
    thm: [
      'En +∞, les puissances de x l’emportent sur ln x : lim<sub>x→+∞</sub> (ln x)/x<sup>n</sup> = 0 pour n &gt; 0.',
      'En 0⁺, x<sup>n</sup> ln x → 0.',
    ],
    formula: ['lim<sub>x→+∞</sub> ' + f('ln x', 'x') + ' = 0', 'lim<sub>x→0⁺</sub> x ln x = 0'],
    ex: 'lim<sub>x→+∞</sub> (ln x)/x = 0 ; lim<sub>x→+∞</sub> (ln x)/√x = 0 ; lim<sub>x→0⁺</sub> x ln x = 0.',
  });

  K.slide('logarithme', {
    id: 'log-decimal',
    kicker: 'Logarithme · 6',
    title: 'Logarithme décimal',
    def: [
      'Le logarithme décimal est log x = ln x / ln 10. Il vérifie log 10<sup>n</sup> = n et sert aux échelles (pH, décibels, Richter).',
    ],
    formula: ['log x = ' + f('ln x', 'ln 10'), '10<sup>log x</sup> = x'],
    ex: 'log 1000 = 3 ; log 0,01 = −2 ; un pH de 3 correspond à [H₃O⁺] = 10<sup>−3</sup> mol/L.',
  });

  K.slide('logarithme', {
    id: 'log-equations',
    kicker: 'Logarithme · 7',
    title: 'Équations et inéquations',
    meth: [
      'Déterminer le domaine : les expressions dans les logarithmes doivent être strictement positives.',
      'Regrouper les logarithmes avec les propriétés algébriques.',
      'Utiliser la stricte croissance : ln a = ln b ⟺ a = b, et ln a &lt; ln b ⟺ a &lt; b.',
      'Vérifier les solutions dans le domaine.',
    ],
    ex: 'ln x + ln(x − 2) = ln 3 : domaine x &gt; 2, puis ln(x(x − 2)) = ln 3, donc x² − 2x − 3 = 0 et x = 3 (x = −1 est exclu).',
  });

  K.slide('logarithme', {
    id: 'log-figure',
    kicker: 'Logarithme · 8',
    title: 'La tangente en a',
    formula: ['y = ln a + ' + f('1', 'a') + '(x − a)'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 8, ymin: -4, ymax: 3 },
        params: [{ key: 'a', label: 'point a', min: 0.3, max: 6, step: 0.1, value: 2 }],
        draw(p) {
          const a = p.state.a;
          p.plot((x) => (x > 0 ? Math.log(x) : NaN), { color: C.ACCENT });
          p.tangent((x) => Math.log(x), a, { color: C.BLUE, label: 'tangente' });
        },
        readout(s) {
          return `pente = 1/a = ${M.com(1 / s.a)}`;
        },
      });
    },
  });

  /* ==================== Fonctions trigonométriques ==================== */

  K.slide('trigo-complements', {
    id: 'tc-rappels',
    kicker: 'Trigonométrie · 1',
    title: 'Cercle et fonctions trigonométriques',
    prop: [
      'cos x est l’abscisse et sin x l’ordonnée du point du cercle unité associé à l’angle x.',
      'Les deux fonctions sont définies sur ℝ, périodiques de période 2π, et à valeurs dans [−1 ; 1].',
      'cos est paire, sin est impaire. tan x = sin x / cos x, définie pour cos x ≠ 0.',
    ],
    formula: ['cos² x + sin² x = 1', 'tan x = ' + f('sin x', 'cos x')],
  });

  K.slide('trigo-complements', {
    id: 'tc-derivees',
    kicker: 'Trigonométrie · 2',
    title: 'Dérivées',
    prop: [
      '(sin x)′ = cos x et (cos x)′ = −sin x.',
      '(sin u)′ = u′ cos u et (cos u)′ = −u′ sin u.',
      '(tan x)′ = 1 + tan² x = 1/cos² x.',
    ],
    formula: ['(sin x)′ = cos x', '(cos x)′ = − sin x'],
    ex: 'f(x) = sin x cos x : f′(x) = cos² x − sin² x = cos(2x).',
  });

  K.slide('trigo-complements', {
    id: 'tc-variations',
    kicker: 'Trigonométrie · 3',
    title: 'Variations',
    tab: {
      type: 'variations',
      headLabel: 'x',
      x: ['0', 'π/2', 'π', '3π/2', '2π'],
      rows: [
        { label: 'cos x', values: ['1', '0', '−1', '0', '1'], arrows: ['down', 'down', 'up', 'up'] },
        { label: 'sin x', values: ['0', '1', '0', '−1', '0'], arrows: ['up', 'down', 'down', 'up'] },
      ],
      caption: 'Les variations se répètent à l’identique sur chaque intervalle de longueur 2π.',
    },
    prop: [
      'cos est décroissante sur [0 ; π], croissante sur [π ; 2π].',
      'sin est croissante sur [0 ; π/2], décroissante sur [π/2 ; 3π/2], croissante sur [3π/2 ; 2π].',
    ],
  });

  K.slide('trigo-complements', {
    id: 'tc-addition',
    kicker: 'Trigonométrie · 4',
    title: 'Formules d’addition',
    thm: [
      'Pour tous réels a et b : cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b.',
      'cos(a − b) = cos a cos b + sin a sin b ; sin(a − b) = sin a cos b − cos a sin b.',
    ],
    formula: [
      'cos(a + b) = cos a cos b − sin a sin b',
      'sin(a + b) = sin a cos b + cos a sin b',
    ],
    ex: 'cos(π/12) = cos(π/3 − π/4) = cos(π/3)cos(π/4) + sin(π/3)sin(π/4) = (√6 + √2)/4.',
  });

  K.slide('trigo-complements', {
    id: 'tc-duplication',
    kicker: 'Trigonométrie · 5',
    title: 'Duplication et linéarisation',
    prop: [
      'cos 2a = cos² a − sin² a = 2cos² a − 1 = 1 − 2sin² a.',
      'sin 2a = 2 sin a cos a.',
      'cos² a = (1 + cos 2a)/2 et sin² a = (1 − cos 2a)/2.',
    ],
    formula: ['cos 2a = cos² a − sin² a', 'sin 2a = 2 sin a cos a'],
    ex: 'Sur [0 ; π], l’équation cos 2x = 1/2 donne 2x = π/3 ou 5π/3, donc x = π/6 ou 5π/6.',
  });

  K.slide('trigo-complements', {
    id: 'tc-equations',
    kicker: 'Trigonométrie · 6',
    title: 'Équations trigonométriques',
    prop: [
      'cos x = cos α ⟺ x = α + 2kπ ou x = −α + 2kπ, k ∈ ℤ.',
      'sin x = sin α ⟺ x = α + 2kπ ou x = π − α + 2kπ, k ∈ ℤ.',
      'On cherche d’abord une solution α dans [0 ; 2π] sur le cercle.',
    ],
    formula: ['cos x = cos α ⟺ x = ± α + 2kπ', 'sin x = sin α ⟺ x = α ou π − α (mod 2π)'],
    ex: 'cos x = −1/2 : x = 2π/3 + 2kπ ou x = 4π/3 + 2kπ. Sur [0 ; 2π], S = {2π/3 ; 4π/3}.',
  });

  K.slide('trigo-complements', {
    id: 'tc-figure',
    kicker: 'Trigonométrie · 7',
    title: 'La tangente à la sinusoïde',
    formula: ['(sin x)′ = cos x'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -7, xmax: 7, ymin: -2, ymax: 2 },
        params: [{ key: 'a', label: 'point a', min: -6, max: 6, step: 0.1, value: 0 }],
        draw(p) {
          p.plot((x) => Math.sin(x), { color: C.ACCENT });
          p.plot((x) => Math.cos(x), { color: 'rgba(143, 203, 182, 0.55)', width: 1.8 });
          p.tangent((x) => Math.sin(x), p.state.a, { color: C.BLUE, half: 1.4 });
        },
        readout(s) {
          return `pente = cos a = ${M.com(Math.cos(s.a))}`;
        },
      });
    },
  });

  /* ==================== Primitives et équations différentielles ==================== */

  K.slide('primitives-equations-differentielles', {
    id: 'ped-primitive',
    kicker: 'Primitives · 1',
    title: 'Une primitive',
    def: [
      'F est une primitive de f sur un intervalle I si F est dérivable sur I et F′ = f sur I.',
    ],
    prop: [
      'Si F est une primitive de f, alors toutes les primitives de f sont de la forme F + k, avec k ∈ ℝ.',
      'Deux primitives de f diffèrent donc d’une constante.',
    ],
    formula: ['F′ = f', 'primitives : F + k'],
    ex: 'Les primitives de f(x) = 2x sont F(x) = x² + k. Celles de f(x) = e<sup>x</sup> sont e<sup>x</sup> + k.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-tableau',
    kicker: 'Primitives · 2',
    title: 'Primitives usuelles',
    tab: {
      head: ['f(x)', 'F(x)', 'sur'],
      align: ['center', 'center', 'left'],
      rows: [
        ['x<sup>n</sup> (n ≠ −1)', f('x<sup>n+1</sup>', 'n + 1') + ' + k', 'ℝ ou ]0 ; +∞['],
        [f('1', 'x'), 'ln |x| + k', 'ℝ*'],
        ['e<sup>x</sup>', 'e<sup>x</sup> + k', 'ℝ'],
        ['cos x', 'sin x + k', 'ℝ'],
        ['sin x', '− cos x + k', 'ℝ'],
        [f('1', 'x²'), '− ' + f('1', 'x') + ' + k', 'ℝ*'],
      ],
      caption: 'On vérifie chaque ligne en dérivant F : c’est le contrôle le plus rapide.',
    },
    rem: 'On vérifie toujours en dérivant F : c’est le meilleur contrôle.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-composees',
    kicker: 'Primitives · 3',
    title: 'Reconnaître une forme composée',
    prop: [
      'Si u est dérivable : u′ u<sup>n</sup> a pour primitive u<sup>n+1</sup>/(n + 1) (n ≠ −1).',
      'u′/u a pour primitive ln |u| (sur un intervalle où u ≠ 0).',
      'u′ e<sup>u</sup> a pour primitive e<sup>u</sup>.',
      'u′/√u a pour primitive 2√u.',
    ],
    formula: ['u′ u<sup>n</sup> → ' + f('u<sup>n+1</sup>', 'n + 1'), f('u′', 'u') + ' → ln |u|', 'u′ e<sup>u</sup> → e<sup>u</sup>'],
    ex: 'f(x) = 2x e<sup>x²</sup> : u = x², u′ = 2x, donc F(x) = e<sup>x²</sup> + k.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-ydf',
    kicker: 'Équations différentielles · 4',
    title: 'Équation y′ = f',
    def: [
      'Résoudre l’équation différentielle y′ = f sur I, c’est trouver toutes les fonctions y dérivables telles que y′ = f.',
    ],
    prop: [
      'Les solutions sont les primitives de f : y(x) = F(x) + k.',
      'Une condition initiale y(x₀) = y₀ détermine la constante k.',
    ],
    formula: ['y′ = f  ⟹  y = F + k'],
    ex: 'y′ = 2x et y(0) = 3 : y(x) = x² + k, et k = 3, donc y(x) = x² + 3.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-ya',
    kicker: 'Équations différentielles · 5',
    title: 'Équation y′ = ay',
    thm: [
      'Les solutions de y′ = ay, avec a réel non nul, sont les fonctions y(x) = C e<sup>ax</sup>, C ∈ ℝ.',
    ],
    formula: ['y′ = a y ⟹ y(x) = C e<sup>a x</sup>'],
    ex: 'y′ = 3y : y(x) = C e<sup>3x</sup>. Avec y(0) = 2, C = 2, donc y(x) = 2e<sup>3x</sup>.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-ayb',
    kicker: 'Équations différentielles · 6',
    title: 'Équation y′ = ay + b',
    thm: [
      'Les solutions de y′ = ay + b (a ≠ 0) sont y(x) = C e<sup>ax</sup> − b/a, C ∈ ℝ.',
      'La solution constante y = −b/a est une solution particulière.',
    ],
    formula: ['y(x) = C e<sup>ax</sup> − ' + f('b', 'a')],
    ex: 'y′ = 2y + 4 : y(x) = C e<sup>2x</sup> − 2. Avec y(0) = 0, C = 2, donc y(x) = 2e<sup>2x</sup> − 2.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-condition',
    kicker: 'Équations différentielles · 7',
    title: 'Condition initiale',
    meth: [
      'Écrire la forme générale des solutions.',
      'Remplacer x par la valeur initiale et y par la valeur donnée.',
      'Résoudre l’équation obtenue pour trouver C.',
      'Écrire la solution particulière et vérifier.',
    ],
    ex: 'y′ = −y + 3 et y(0) = 1 : y(x) = C e<sup>−x</sup> + 3, donc 1 = C + 3 et C = −2. Solution : y(x) = 3 − 2e<sup>−x</sup>.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-modele',
    kicker: 'Équations différentielles · 8',
    title: 'Modéliser une évolution',
    prop: [
      'Croissance exponentielle : y′ = ay avec a &gt; 0.',
      'Décroissance radioactive ou refroidissement : y′ = −ky avec k &gt; 0.',
      'Évolution vers une limite : y′ = a(L − y), de solution y(t) = L + C e<sup>−at</sup>.',
    ],
    formula: ['y′ = a(L − y)  ⟹  y(t) = L + C e<sup>−a t</sup>'],
    ex: 'Un four à 20 °C monte vers 180 °C : T′ = 0,1(180 − T), donc T(t) = 180 − 160 e<sup>−0,1t</sup>.',
  });

  K.slide('primitives-equations-differentielles', {
    id: 'ped-figure',
    kicker: 'Équations différentielles · 9',
    title: 'Une famille de solutions',
    formula: ['y = C e<sup>ax</sup>'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 4, ymin: -4, ymax: 8 },
        params: [{ key: 'a', label: 'a', min: -1.5, max: 1.5, step: 0.1, value: 0.6 }],
        draw(p) {
          const a = p.state.a;
          [-1, -0.5, 0.5, 1].forEach((constant) => {
            p.plot((x) => constant * Math.exp(a * x), { color: C.ACCENT, width: 1.8 });
          });
        },
      });
    },
    rem: 'Chaque condition initiale choisit une courbe de la famille : les solutions ne se croisent jamais.',
  });

  /* ==================== Calcul intégral ==================== */

  K.slide('integrale', {
    id: 'int-definition',
    kicker: 'Intégrale · 1',
    title: 'L’intégrale, une aire',
    def: [
      'Si f est continue et positive sur [a ; b], l’intégrale ∫<sub>a</sub><sup>b</sup> f(x) dx est l’aire sous la courbe, entre l’axe des abscisses et la courbe, de x = a à x = b.',
      'L’unité d’aire est celle du repère.',
    ],
    formula: ['∫<sub>a</sub><sup>b</sup> f(x) dx = aire sous la courbe'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -0.5, xmax: 5, ymin: -1, ymax: 6 },
        params: [
          { key: 'a', label: 'borne a', min: 0, max: 2, step: 0.1, value: 1 },
          { key: 'b', label: 'borne b', min: 2.5, max: 4.5, step: 0.1, value: 4 },
        ],
        draw(p) {
          const a = Math.min(p.state.a, p.state.b - 0.2);
          const b = p.state.b;
          const fn = (x) => 0.4 * x * x + 0.5;
          p.plot(fn, { color: C.ACCENT });
          p.area(fn, a, b, { color: 'rgba(227, 199, 158, 0.24)', stroke: C.ACCENT });
          p.vline(a, { color: 'rgba(124, 176, 255, 0.5)' });
          p.vline(b, { color: 'rgba(124, 176, 255, 0.5)' });
        },
        readout(s) {
          const a = Math.min(s.a, s.b - 0.2);
          const b = s.b;
          const area = (0.4 * (b ** 3 - a ** 3)) / 3 + 0.5 * (b - a);
          return (
            `<div class="kv"><dt>intervalle</dt><dd>[${M.com(a)} ; ${M.com(b)}]</dd></div>` +
            `<div class="kv"><dt>aire</dt><dd>${M.com(area, 3)}</dd></div>`
          );
        },
        caption: 'Déplacer a et b change l’intervalle, donc l’aire sous la courbe.',
      });
    },
  });

  K.slide('integrale', {
    id: 'int-riemann',
    kicker: 'Intégrale · 2',
    title: 'Approcher l’aire par des rectangles',
    def: [
      'On découpe [a ; b] en n rectangles de largeur (b − a)/n. La somme de leurs aires approche l’intégrale, d’autant mieux que n est grand.',
    ],
    formula: ['aire ≈ Σ f(x<sub>i</sub>) × (b − a)/n'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: 0, xmax: 5, ymin: 0, ymax: 7.2 },
        params: [{ key: 'n', label: 'nombre de rectangles', min: 2, max: 30, step: 1, value: 8, decimals: 0 }],
        draw(p) {
          const a = 1;
          const b = 4;
          const fn = (x) => 0.4 * x * x + 0.5;
          const n = Math.round(p.state.n);
          const w = (b - a) / n;
          for (let i = 0; i < n; i += 1) {
            const x = a + i * w;
            p.rect(x, 0, w, fn(x), {
              fill: 'rgba(227, 199, 158, 0.16)',
              stroke: 'rgba(227, 199, 158, 0.5)',
              width: 1,
            });
          }
          p.plot(fn, { color: C.ACCENT, width: 2.6 });
          p.vline(a, { color: 'rgba(124, 176, 255, 0.5)' });
          p.vline(b, { color: 'rgba(124, 176, 255, 0.5)' });
        },
        readout(s) {
          const a = 1;
          const b = 4;
          const fn = (x) => 0.4 * x * x + 0.5;
          const n = Math.round(s.n);
          const w = (b - a) / n;
          let somme = 0;
          for (let i = 0; i < n; i += 1) somme += fn(a + i * w) * w;
          return (
            `<div class="kv"><dt>somme des rectangles</dt><dd>${M.com(somme, 3)}</dd></div>` +
            `<div class="kv"><dt>valeur exacte</dt><dd>9,900</dd></div>`
          );
        },
        caption: 'Hauteur prise à gauche de chaque rectangle : l’approximation se rapproche de 9,9.',
      });
    },
    rem: 'Quand n augmente, la somme des rectangles converge vers l’intégrale : c’est la définition de l’aire sous la courbe.',
  });

  K.slide('integrale', {
    id: 'int-proprietes',
    kicker: 'Intégrale · 3',
    title: 'Propriétés de l’intégrale',
    prop: [
      'Linéarité : ∫(αf + βg) = α∫f + β∫g.',
      'Relation de Chasles : ∫<sub>a</sub><sup>b</sup> f + ∫<sub>b</sub><sup>c</sup> f = ∫<sub>a</sub><sup>c</sup> f.',
      'Si f ≥ 0 sur [a ; b], alors ∫<sub>a</sub><sup>b</sup> f ≥ 0 ; si f ≤ g, alors ∫f ≤ ∫g.',
      '∫<sub>a</sub><sup>a</sup> f = 0 et ∫<sub>b</sub><sup>a</sup> f = −∫<sub>a</sub><sup>b</sup> f.',
    ],
    formula: ['∫<sub>a</sub><sup>b</sup> (αf + βg) = α∫<sub>a</sub><sup>b</sup> f + β∫<sub>a</sub><sup>b</sup> g'],
    ex: '∫<sub>0</sub><sup>1</sup> (2x + 3) dx = 2∫<sub>0</sub><sup>1</sup> x dx + 3∫<sub>0</sub><sup>1</sup> dx = 1 + 3 = 4.',
  });

  K.slide('integrale', {
    id: 'int-primitive',
    kicker: 'Intégrale · 4',
    title: 'Intégrale et primitive',
    thm: [
      'Si f est continue sur [a ; b] et F est une primitive de f, alors ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a).',
      'La fonction x ↦ ∫<sub>a</sub><sup>x</sup> f(t) dt est la primitive de f qui s’annule en a.',
    ],
    formula: ['∫<sub>a</sub><sup>b</sup> f(x) dx = [F(x)]<sub>a</sub><sup>b</sup> = F(b) − F(a)'],
    ex: '∫<sub>1</sub><sup>3</sup> x² dx = [x³/3]<sub>1</sub><sup>3</sup> = 27/3 − 1/3 = 26/3.',
  });

  K.slide('integrale', {
    id: 'int-moyenne',
    kicker: 'Intégrale · 5',
    title: 'Valeur moyenne',
    def: [
      'La valeur moyenne de f sur [a ; b] est μ = (1/(b − a)) ∫<sub>a</sub><sup>b</sup> f(x) dx.',
      'C’est la hauteur du rectangle de largeur b − a et d’aire égale à l’intégrale.',
    ],
    formula: ['μ = ' + f('1', 'b − a') + ' ∫<sub>a</sub><sup>b</sup> f(x) dx'],
    ex: 'La valeur moyenne de f(x) = x sur [0 ; 2] vaut 1 : le rectangle de hauteur 1 a la même aire que le triangle sous la droite.',
  });

  K.slide('integrale', {
    id: 'int-calcul',
    kicker: 'Intégrale · 6',
    title: 'Calculer une intégrale',
    meth: [
      'Vérifier que f est continue sur [a ; b].',
      'Chercher une primitive F de f.',
      'Calculer F(b) − F(a).',
      'Contrôler le signe du résultat avec la position de la courbe.',
    ],
    ex: '∫<sub>0</sub><sup>1</sup> e<sup>x</sup> dx = e − 1 ; ∫<sub>0</sub><sup>π/2</sup> cos x dx = sin(π/2) − sin 0 = 1.',
  });

  K.slide('integrale', {
    id: 'int-aire',
    kicker: 'Intégrale · 7',
    title: 'Aire entre deux courbes',
    prop: [
      'Si f ≥ g sur [a ; b], l’aire entre les courbes y = f(x) et y = g(x) est ∫<sub>a</sub><sup>b</sup> (f − g)(x) dx.',
      'Si les courbes se croisent, on découpe l’intervalle aux points d’intersection et on prend la valeur absolue sur chaque morceau.',
    ],
    formula: ['A = ∫<sub>a</sub><sup>b</sup> (f(x) − g(x)) dx'],
    ex: 'Aire entre y = x² et y = x sur [0 ; 1] : ∫<sub>0</sub><sup>1</sup> (x − x²) dx = 1/2 − 1/3 = 1/6.',
  });

  K.slide('integrale', {
    id: 'int-ipp',
    kicker: 'Intégrale · 8',
    title: 'Intégration par parties',
    thm: [
      'Si u et v sont dérivables à dérivées continues sur [a ; b], alors ∫<sub>a</sub><sup>b</sup> u′(x)v(x) dx = [u(x)v(x)]<sub>a</sub><sup>b</sup> − ∫<sub>a</sub><sup>b</sup> u(x)v′(x) dx.',
    ],
    formula: ['∫<sub>a</sub><sup>b</sup> u′v = [uv]<sub>a</sub><sup>b</sup> − ∫<sub>a</sub><sup>b</sup> uv′'],
    meth: [
      'Choisir u′ facile à primitiver et v′ facile à dériver.',
      'Appliquer la formule.',
      'Calculer le crochet et la nouvelle intégrale.',
    ],
    ex: '∫<sub>1</sub><sup>e</sup> ln x dx : u′ = 1, v = ln x, donc [x ln x]<sub>1</sub><sup>e</sup> − ∫<sub>1</sub><sup>e</sup> 1 dx = e − (e − 1) = 1.',
  });

  K.slide('integrale', {
    id: 'int-exemple',
    kicker: 'Intégrale · 9',
    title: 'Une aire complète',
    def: ['Calculer l’aire du domaine compris entre y = x² − 4 et l’axe des abscisses.'],
    prop: [
      'x² − 4 = 0 pour x = ±2, et x² − 4 ≤ 0 sur [−2 ; 2].',
      'L’aire vaut −∫<sub>−2</sub><sup>2</sup> (x² − 4) dx = ∫<sub>−2</sub><sup>2</sup> (4 − x²) dx.',
      'Une primitive est 4x − x³/3 ; le calcul donne (8 − 8/3) − (−8 + 8/3) = 32/3.',
    ],
    rem: 'On prend l’opposé lorsque la courbe est sous l’axe : une intégrale peut être négative, une aire est positive.',
  });

  /* ==================== Loi binomiale ==================== */

  K.slide('loi-binomiale', {
    id: 'lb-bernoulli',
    kicker: 'Loi binomiale · 1',
    title: 'Épreuve de Bernoulli',
    def: [
      'Une épreuve de Bernoulli est une expérience à deux issues : succès (probabilité p) et échec (probabilité 1 − p).',
      'La variable X qui vaut 1 en cas de succès et 0 sinon suit la loi de Bernoulli de paramètre p.',
    ],
    formula: ['P(X = 1) = p', 'E(X) = p,  V(X) = p(1 − p)'],
    ex: 'Obtenir un 6 avec un dé : p = 1/6 ; E(X) = 1/6 et V(X) = 5/36.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-schema',
    kicker: 'Loi binomiale · 2',
    title: 'Schéma de Bernoulli',
    def: [
      'Un schéma de Bernoulli est la répétition de n épreuves de Bernoulli identiques et indépendantes de paramètre p.',
      'La variable X égale au nombre de succès suit la loi binomiale B(n ; p).',
    ],
    prop: [
      'Les issues sont des chemins de l’arbre : chaque chemin avec k succès a pour probabilité p<sup>k</sup>(1 − p)<sup>n−k</sup>.',
      'Il y a C<sub>n</sub><sup>k</sup> chemins comportant k succès.',
    ],
    formula: ['X ~ B(n ; p)'],
  });

  K.slide('loi-binomiale', {
    id: 'lb-loi',
    kicker: 'Loi binomiale · 3',
    title: 'La formule de la loi binomiale',
    thm: [
      'Si X ~ B(n ; p), alors pour tout k de 0 à n : P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup> (1 − p)<sup>n−k</sup>.',
    ],
    formula: ['P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup> (1 − p)<sup>n−k</sup>'],
    ex: 'X ~ B(5 ; 0,3) : P(X = 2) = C₅² × 0,3² × 0,7³ = 10 × 0,09 × 0,343 = 0,3087.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-coefficients',
    kicker: 'Loi binomiale · 4',
    title: 'Calculer les coefficients',
    prop: [
      'C<sub>n</sub><sup>0</sup> = C<sub>n</sub><sup>n</sup> = 1 ; C<sub>n</sub><sup>1</sup> = n ; C<sub>n</sub><sup>k</sup> = C<sub>n</sub><sup>n−k</sup>.',
      'Relation de Pascal : C<sub>n</sub><sup>k</sup> = C<sub>n−1</sub><sup>k−1</sup> + C<sub>n−1</sub><sup>k</sup>.',
      'La somme des coefficients vaut 2<sup>n</sup> : Σ C<sub>n</sub><sup>k</sup> = 2<sup>n</sup>.',
    ],
    formula: ['C<sub>n</sub><sup>k</sup> = ' + f('n!', 'k!(n − k)!')],
    ex: 'C₅² = 10 ; C₅³ = 10 ; C₁₀⁴ = 210. La ligne 5 du triangle de Pascal est 1, 5, 10, 10, 5, 1.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-esperance',
    kicker: 'Loi binomiale · 5',
    title: 'Espérance et variance',
    prop: [
      'Si X ~ B(n ; p), alors E(X) = np, V(X) = np(1 − p) et σ(X) = √(np(1 − p)).',
      'L’espérance est le nombre moyen de succès sur n répétitions.',
    ],
    formula: ['E(X) = np', 'V(X) = np(1 − p)'],
    ex: 'X ~ B(50 ; 0,2) : E(X) = 10, V(X) = 8 et σ(X) ≈ 2,83.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-exemple',
    kicker: 'Loi binomiale · 6',
    title: 'Un contrôle de qualité',
    def: [
      'Une machine produit 5 % de pièces défectueuses. On prélève 20 pièces au hasard, avec remise. X est le nombre de pièces défectueuses.',
    ],
    prop: [
      'X ~ B(20 ; 0,05).',
      'P(X = 0) = 0,95²⁰ ≈ 0,358.',
      'P(X ≥ 1) = 1 − P(X = 0) ≈ 0,642.',
      'E(X) = 1 : on attend en moyenne une pièce défectueuse par prélèvement de 20.',
    ],
    rem: 'Le « avec remise » (ou un stock très grand) justifie l’indépendance des épreuves.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-figure',
    kicker: 'Loi binomiale · 7',
    title: 'La forme de la loi',
    formula: ['X ~ B(n ; p)'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -0.5, xmax: 20.5, ymin: 0, ymax: 0.45 },
        params: [
          { key: 'n', label: 'n', min: 4, max: 20, step: 1, value: 12, decimals: 0 },
          { key: 'p', label: 'p', min: 0.1, max: 0.9, step: 0.05, value: 0.5 },
        ],
        draw(p) {
          const n = p.state.n;
          const prob = p.state.p;
          const choose = (k) => {
            let c = 1;
            for (let i = 1; i <= k; i += 1) c = (c * (n - k + i)) / i;
            return c;
          };
          for (let k = 0; k <= n; k += 1) {
            const pk = choose(k) * Math.pow(prob, k) * Math.pow(1 - prob, n - k);
            const [x0, y0] = p.map(k - 0.36, 0);
            const [x1] = p.map(k + 0.36, pk);
            p.ctx.save();
            p.ctx.fillStyle = 'rgba(180, 168, 240, 0.3)';
            p.ctx.strokeStyle = C.VIOLET;
            p.ctx.lineWidth = 1.4;
            p.ctx.fillRect(x0, p.map(0, pk)[1], x1 - x0, y0 - p.map(0, pk)[1]);
            p.ctx.strokeRect(x0, p.map(0, pk)[1], x1 - x0, y0 - p.map(0, pk)[1]);
            p.ctx.restore();
          }
        },
        readout(s) {
          const v = s.n * s.p * (1 - s.p);
          return `E(X) = ${M.com(s.n * s.p)} · σ = ${M.com(Math.sqrt(v))}`;
        },
      });
    },
  });

  /* ==================== Sommes de variables aléatoires ==================== */

  K.slide('sommes-va', {
    id: 'sva-somme',
    kicker: 'Sommes de variables · 1',
    title: 'Somme de deux variables aléatoires',
    def: [
      'Si X et Y sont deux variables aléatoires définies sur le même univers, X + Y est la variable qui, à chaque issue, associe la somme des valeurs de X et de Y.',
    ],
    prop: [
      'E(X + Y) = E(X) + E(Y), toujours.',
      'Si X et Y sont indépendantes, V(X + Y) = V(X) + V(Y).',
      'Sans indépendance, il faut ajouter un terme de covariance : V(X + Y) = V(X) + V(Y) + 2cov(X, Y).',
    ],
    formula: ['E(X + Y) = E(X) + E(Y)', 'V(X + Y) = V(X) + V(Y)  (indépendantes)'],
    ex: 'X et Y indépendantes avec E(X) = 2, E(Y) = 5, V(X) = 1, V(Y) = 4 : E(X + Y) = 7 et V(X + Y) = 5.',
  });

  K.slide('sommes-va', {
    id: 'sva-esperance',
    kicker: 'Sommes de variables · 2',
    title: 'Linéarité de l’espérance',
    thm: [
      'Pour tous réels a et b et toutes variables X et Y : E(aX + bY) = aE(X) + bE(Y).',
      'En particulier, E(X₁ + … + X<sub>n</sub>) = E(X₁) + … + E(X<sub>n</sub>), même sans indépendance.',
    ],
    formula: ['E(aX + bY) = a E(X) + b E(Y)'],
    ex: 'Si chaque lancer de dé a une espérance de 3,5, la somme de 10 lancers a une espérance de 35.',
  });

  K.slide('sommes-va', {
    id: 'sva-variance',
    kicker: 'Sommes de variables · 3',
    title: 'Variance d’une somme',
    thm: [
      'Si X₁, …, X<sub>n</sub> sont indépendantes, alors V(X₁ + … + X<sub>n</sub>) = V(X₁) + … + V(X<sub>n</sub>).',
      'Pour des variables indépendantes et de même loi : V(X₁ + … + X<sub>n</sub>) = n V(X₁).',
    ],
    formula: ['V(X₁ + … + X<sub>n</sub>) = Σ V(X<sub>i</sub>)'],
    rem: 'L’écart type de la somme n’est pas la somme des écarts types : σ(X + Y) = √(σ(X)² + σ(Y)²) si X et Y sont indépendantes.',
    ex: '10 lancers d’un dé : V = 10 × 35/12 ≈ 29,17, donc σ ≈ 5,40 (et non 10 × 1,71).',
  });

  K.slide('sommes-va', {
    id: 'sva-binomiales',
    kicker: 'Sommes de variables · 4',
    title: 'Somme de lois binomiales',
    thm: [
      'Si X ~ B(n ; p) et Y ~ B(m ; p) sont indépendantes, alors X + Y ~ B(n + m ; p).',
    ],
    prop: [
      'On additionne les nombres d’épreuves, le paramètre p reste le même.',
      'Cette propriété permet de retrouver E(X + Y) = (n + m)p et V(X + Y) = (n + m)p(1 − p).',
    ],
    formula: ['B(n ; p) + B(m ; p) = B(n + m ; p)'],
    ex: 'Deux séries de 10 lancers d’une pièce donnent au total le nombre de piles sur 20 lancers : B(20 ; 0,5).',
  });

  K.slide('sommes-va', {
    id: 'sva-exemple',
    kicker: 'Sommes de variables · 5',
    title: 'Un exemple avec deux dés',
    def: ['On lance deux dés équilibrés et on note S la somme des résultats.'],
    prop: [
      'Chaque dé a pour espérance 3,5 et pour variance 35/12.',
      'E(S) = 7 et V(S) = 70/12 ≈ 5,83, donc σ(S) ≈ 2,415.',
      'La somme la plus probable est 7, avec une probabilité 6/36 = 1/6.',
    ],
    rem: 'Les deux dés sont indépendants : les variances s’ajoutent, pas les écarts types.',
  });

  K.slide('sommes-va', {
    id: 'sva-methode',
    kicker: 'Sommes de variables · 6',
    title: 'Méthode avec une somme',
    meth: [
      'Écrire la variable totale comme somme de variables élémentaires.',
      'Utiliser la linéarité pour l’espérance.',
      'Vérifier l’indépendance avant d’additionner les variances.',
      'Revenir à l’écart type en prenant la racine carrée.',
    ],
    ex: 'Pour 100 pièces dont la masse a pour espérance 10 g et écart type 0,2 g, la masse totale a pour espérance 1 000 g et pour écart type 2 g (si les masses sont indépendantes).',
  });

  /* ==================== Loi des grands nombres ==================== */

  K.slide('loi-grands-nombres', {
    id: 'lgn-tchebychev',
    kicker: 'Loi des grands nombres · 1',
    title: 'Inégalité de Bienaymé-Tchebychev',
    thm: [
      'Pour toute variable aléatoire X d’espérance μ et de variance V, et pour tout réel α &gt; 0 : P(|X − μ| ≥ α) ≤ V/α².',
    ],
    formula: ['P(|X − μ| ≥ α) ≤ ' + f('V(X)', 'α²')],
    ex: 'X d’espérance 10 et de variance 4 : P(|X − 10| ≥ 3) ≤ 4/9 ≈ 0,444.',
  });

  K.slide('loi-grands-nombres', {
    id: 'lgn-theoreme',
    kicker: 'Loi des grands nombres · 2',
    title: 'La loi des grands nombres',
    thm: [
      'Soit (X<sub>n</sub>) une suite de variables aléatoires indépendantes de même loi, d’espérance μ et de variance V. La moyenne M<sub>n</sub> = (X₁ + … + X<sub>n</sub>)/n converge vers μ : pour tout α &gt; 0, P(|M<sub>n</sub> − μ| ≥ α) tend vers 0.',
    ],
    formula: ['M<sub>n</sub> = ' + f('X₁ + … + X<sub>n</sub>', 'n') + ' → μ'],
    ex: 'La fréquence d’apparition d’un 6 sur un grand nombre de lancers se rapproche de 1/6.',
  });

  K.slide('loi-grands-nombres', {
    id: 'lgn-frequence',
    kicker: 'Loi des grands nombres · 3',
    title: 'Fréquence et probabilité',
    def: [
      'Dans une population, une proportion p possède un caractère. Sur un échantillon de taille n, la fréquence observée est F<sub>n</sub>.',
    ],
    prop: [
      'E(F<sub>n</sub>) = p et V(F<sub>n</sub>) = p(1 − p)/n.',
      'La loi des grands nombres assure que F<sub>n</sub> se rapproche de p quand n augmente.',
      'L’écart type de F<sub>n</sub> diminue comme 1/√n.',
    ],
    formula: ['E(F<sub>n</sub>) = p', 'σ(F<sub>n</sub>) = ' + f('√(p(1 − p))', '√n')],
    ex: 'Pour p = 0,5 et n = 100, σ(F<sub>n</sub>) = 0,05 ; pour n = 10 000, σ = 0,005.',
  });

  K.slide('loi-grands-nombres', {
    id: 'lgn-intervalle',
    kicker: 'Loi des grands nombres · 4',
    title: 'Intervalle de fluctuation',
    thm: [
      'Avec l’inégalité de Bienaymé-Tchebychev, on obtient que F<sub>n</sub> appartient à l’intervalle [p − 1/√n ; p + 1/√n] avec une probabilité d’au moins 1 − 1/4 = 0,75.',
    ],
    prop: [
      'Au seuil de 95 %, on utilise l’intervalle asymptotique [p − 1,96√(p(1 − p)/n) ; p + 1,96√(p(1 − p)/n)].',
      'Si la fréquence observée sort de l’intervalle de fluctuation, on rejette l’hypothèse p au seuil considéré.',
    ],
    formula: ['I<sub>n</sub> = [p − ' + f('1', '√n') + ' ; p + ' + f('1', '√n') + ']'],
    ex: 'p = 0,4 et n = 100 : I ≈ [0,302 ; 0,498] au seuil de 95 %. Une fréquence observée de 0,55 est anormalement haute.',
  });

  K.slide('loi-grands-nombres', {
    id: 'lgn-exemple',
    kicker: 'Loi des grands nombres · 5',
    title: 'Prendre une décision',
    meth: [
      'Formuler l’hypothèse sur la proportion p.',
      'Calculer l’intervalle de fluctuation pour la taille n de l’échantillon.',
      'Comparer la fréquence observée à cet intervalle.',
      'Conclure : compatible avec l’hypothèse, ou rejet au seuil choisi.',
    ],
    ex: 'Un candidat est donné à 40 %. Sur 200 électeurs, 68 le soutiennent (f = 0,34). L’intervalle à 95 % vaut environ [0,332 ; 0,468] : 0,34 est dedans, le résultat reste compatible.',
  });

  K.slide('loi-grands-nombres', {
    id: 'lgn-remarques',
    kicker: 'Loi des grands nombres · 6',
    title: 'Ce que dit — et ne dit pas — la loi',
    prop: [
      'Elle justifie l’usage des fréquences pour estimer une probabilité.',
      'Elle ne dit pas que la fréquence est exactement p, ni qu’elle s’en rapproche à chaque expérience.',
      'Elle ne permet pas de prédire une issue individuelle.',
      'Les variables doivent être indépendantes et de même loi.',
    ],
    rem: 'Un écart entre fréquence et probabilité n’est pas une preuve de triche : il faut tenir compte de la taille de l’échantillon et du seuil.',
  });
})();
