// Mathématiques expertes — cours aligné sur les chapitres du manuel
// (Lelivrescolaire Terminale expertes / Sésamath Terminale expertes).
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const C = G.colors;

  const mat = M.mat;

  /* ==================== Nombres complexes : point de vue algébrique ==================== */

  K.slide('complexes-algebrique', {
    id: 'ca-definition',
    kicker: 'Nombres complexes · 1',
    title: 'L’ensemble ℂ',
    def: [
      'On introduit un nombre i tel que i² = −1. Un nombre complexe s’écrit de façon unique z = a + i b, avec a et b réels.',
      'a = Re(z) est la partie réelle, b = Im(z) la partie imaginaire. Deux complexes sont égaux si et seulement si leurs parties réelles et imaginaires sont égales.',
    ],
    formula: ['i² = −1', 'z = a + i b', 'z = z′ ⟺ Re(z) = Re(z′) et Im(z) = Im(z′)'],
    ex: 'z = 3 − 2i : Re(z) = 3 et Im(z) = −2. Le réel 5 s’écrit 5 + 0i ; le nombre i s’écrit 0 + 1i.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-operations',
    kicker: 'Nombres complexes · 2',
    title: 'Addition et produit',
    prop: [
      'On additionne les parties réelles et les parties imaginaires.',
      'On développe les produits comme dans ℝ, puis on remplace i² par −1.',
    ],
    formula: [
      '(a + ib) + (c + id) = (a + c) + i(b + d)',
      '(a + ib)(c + id) = (ac − bd) + i(ad + bc)',
    ],
    ex: '(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 5 + i. Et i³ = i² × i = −i, i⁴ = 1.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-conjugue',
    kicker: 'Nombres complexes · 3',
    title: 'Le conjugué',
    def: ['Le conjugué de z = a + ib est <span class="ovl">z</span> = a − ib.'],
    prop: [
      'z + <span class="ovl">z</span> = 2Re(z) et z − <span class="ovl">z</span> = 2i Im(z).',
      'z <span class="ovl">z</span> = a² + b² est un réel positif.',
      'Le conjugué d’une somme, d’un produit ou d’un quotient est la somme, le produit ou le quotient des conjugués.',
    ],
    formula: ['<span class="ovl">z</span> = a − i b', 'z <span class="ovl">z</span> = a² + b²'],
    ex: 'z = 2 + 5i : <span class="ovl">z</span> = 2 − 5i et z<span class="ovl">z</span> = 4 + 25 = 29.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-module',
    kicker: 'Nombres complexes · 4',
    title: 'Le module',
    def: ['Le module de z = a + ib est le réel |z| = √(a² + b²).'],
    prop: [
      '|z|² = z <span class="ovl">z</span>.',
      '|z| = 0 ⟺ z = 0.',
      '|z z′| = |z| |z′| et |z/z′| = |z|/|z′| pour z′ ≠ 0.',
      'Inégalité triangulaire : |z + z′| ≤ |z| + |z′|.',
    ],
    formula: ['|z| = √(a² + b²)', '|z|² = z <span class="ovl">z</span>'],
    ex: '|3 + 4i| = √(9 + 16) = 5. |(1 + i)(2 − i)| = |1 + i| × |2 − i| = √2 × √5 = √10.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-inverse',
    kicker: 'Nombres complexes · 5',
    title: 'Inverse et quotient',
    prop: [
      'Tout complexe non nul admet un inverse : 1/z = <span class="ovl">z</span> / (z <span class="ovl">z</span>) = <span class="ovl">z</span> / |z|².',
      'Pour calculer un quotient, on multiplie numérateur et dénominateur par le conjugué du dénominateur.',
    ],
    formula: ['z<sup>−1</sup> = ' + f('<span class="ovl">z</span>', '|z|²')],
    ex: '1/(2 + i) = (2 − i)/((2 + i)(2 − i)) = (2 − i)/5 = 2/5 − (1/5)i.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-second-degre',
    kicker: 'Nombres complexes · 6',
    title: 'Équations du second degré',
    thm: [
      'L’équation az² + bz + c = 0 (a ≠ 0, coefficients réels) a pour discriminant Δ = b² − 4ac.',
      'Si Δ ≥ 0, on retrouve les racines réelles. Si Δ &lt; 0, elle admet deux racines complexes conjuguées (−b ± i√(−Δ))/(2a).',
    ],
    formula: ['Δ &lt; 0 : z = ' + f('−b ± i√(−Δ)', '2a')],
    ex: 'z² + z + 1 = 0 : Δ = 1 − 4 = −3, donc z = (−1 ± i√3)/2. Les deux racines sont conjuguées.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-factorisation',
    kicker: 'Nombres complexes · 7',
    title: 'Factorisation par une racine',
    thm: [
      'Si P est un polynôme de degré n ≥ 1 et si P(a) = 0, alors P(z) = (z − a)Q(z), où Q est un polynôme de degré n − 1.',
      'En particulier, un polynôme de degré n a au plus n racines complexes.',
    ],
    formula: ['P(a) = 0 ⟹ P(z) = (z − a)Q(z)'],
    ex: 'P(z) = z³ − 1 : P(1) = 0, donc P(z) = (z − 1)(z² + z + 1), et les autres racines sont (−1 ± i√3)/2.',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-methode',
    kicker: 'Nombres complexes · 8',
    title: 'Mettre sous forme algébrique',
    meth: [
      'Développer et regrouper les termes réels et imaginaires.',
      'Remplacer systématiquement i² par −1.',
      'Pour un quotient, multiplier par le conjugué du dénominateur.',
      'Écrire le résultat sous la forme a + ib.',
    ],
    ex: '(1 + i)/(2 − 3i) = (1 + i)(2 + 3i)/13 = (−1 + 5i)/13 = −1/13 + (5/13)i.',
  });

  /* ==================== Nombres complexes : point de vue géométrique ==================== */

  K.slide('complexes-trigo', {
    id: 'ct-plan',
    kicker: 'Complexes · géométrie 1',
    title: 'Le plan complexe',
    def: [
      'À tout complexe z = a + ib, on associe le point M(a ; b) du plan, appelé image de z, et le vecteur OM. Le nombre z est l’affixe de M.',
      'L’axe des abscisses est l’axe réel, l’axe des ordonnées l’axe imaginaire.',
    ],
    prop: [
      'L’affixe du milieu de [AB] est (z<sub>A</sub> + z<sub>B</sub>)/2.',
      'L’affixe du vecteur AB est z<sub>B</sub> − z<sub>A</sub>.',
      'Le conjugué de z est le symétrique de M par rapport à l’axe réel.',
    ],
    formula: ['z<sub>AB</sub> = z<sub>B</sub> − z<sub>A</sub>', 'z<sub>I</sub> = ' + f('z<sub>A</sub> + z<sub>B</sub>', '2')],
    ex: 'A(2 + i) et B(1 + 3i) : le vecteur AB a pour affixe −1 + 2i et le milieu a pour affixe 1,5 + 2i.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-module-distance',
    kicker: 'Complexes · géométrie 2',
    title: 'Module et distance',
    prop: [
      '|z| est la distance entre O et M.',
      '|z<sub>B</sub> − z<sub>A</sub>| est la distance AB.',
      'L’ensemble des points M d’affixe z tels que |z − z<sub>A</sub>| = r est le cercle de centre A et de rayon r.',
    ],
    formula: ['AB = |z<sub>B</sub> − z<sub>A</sub>|', '|z − z<sub>A</sub>| = r'],
    ex: 'A(1 + 2i), r = 3 : |z − (1 + 2i)| = 3 est le cercle de centre A et de rayon 3.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-argument',
    kicker: 'Complexes · géométrie 3',
    title: 'Argument et forme trigonométrique',
    def: [
      'Un argument de z ≠ 0 est une mesure θ de l’angle orienté entre l’axe réel et OM. Il est défini modulo 2π.',
      'Forme trigonométrique : z = r(cos θ + i sin θ), avec r = |z| et θ = arg(z) [2π].',
    ],
    prop: [
      'Re(z) = r cos θ et Im(z) = r sin θ.',
      'tan θ = Im(z)/Re(z) lorsque Re(z) ≠ 0, mais le signe dépend du quadrant.',
    ],
    formula: ['Arg(z) = θ [2π]', 'z = r(cos θ + i sin θ)'],
    ex: 'z = 1 + i : |z| = √2 et θ = π/4, donc z = √2(cos(π/4) + i sin(π/4)).',
  });

  K.slide('complexes-trigo', {
    id: 'ct-exponentielle',
    kicker: 'Complexes · géométrie 4',
    title: 'Forme exponentielle',
    def: [
      'On note e<sup>iθ</sup> = cos θ + i sin θ. Tout complexe non nul s’écrit z = r e<sup>iθ</sup>, avec r = |z| et θ un argument.',
    ],
    prop: [
      'e<sup>iθ</sup> e<sup>iθ′</sup> = e<sup>i(θ+θ′)</sup> ; e<sup>iθ</sup>/e<sup>iθ′</sup> = e<sup>i(θ−θ′)</sup>.',
      'e<sup>iθ</sup> = 1 ⟺ θ ≡ 0 [2π].',
      'Formule de Moivre : (e<sup>iθ</sup>)<sup>n</sup> = e<sup>inθ</sup>.',
    ],
    formula: ['z = r e<sup>i θ</sup>', '(e<sup>iθ</sup>)<sup>n</sup> = e<sup>i n θ</sup>'],
    ex: 'e<sup>iπ/2</sup> = i ; e<sup>iπ</sup> = −1 ; (1 + i)⁴ = (√2 e<sup>iπ/4</sup>)⁴ = 4e<sup>iπ</sup> = −4.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-proprietes',
    kicker: 'Complexes · géométrie 5',
    title: 'Module et argument d’un produit',
    prop: [
      '|z z′| = |z| |z′| et arg(z z′) = arg(z) + arg(z′) [2π].',
      '|z/z′| = |z|/|z′| et arg(z/z′) = arg(z) − arg(z′) [2π].',
      '|z<sup>n</sup>| = |z|<sup>n</sup> et arg(z<sup>n</sup>) = n arg(z) [2π].',
      'arg(<span class="ovl">z</span>) = −arg(z) [2π].',
    ],
    formula: ['|z z′| = |z| |z′|', 'arg(z z′) = arg z + arg z′'],
    ex: 'z = e<sup>iπ/3</sup> et z′ = e<sup>iπ/4</sup> : z z′ = e<sup>i7π/12</sup>, de module 1 et d’argument 7π/12.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-transformations',
    kicker: 'Complexes · géométrie 6',
    title: 'Transformations du plan',
    prop: [
      'Translation de vecteur d’affixe b : z′ = z + b.',
      'Homothétie de centre O et de rapport k réel : z′ = kz.',
      'Rotation de centre O et d’angle θ : z′ = e<sup>iθ</sup> z.',
      'Rotation de centre A d’affixe a et d’angle θ : z′ − a = e<sup>iθ</sup>(z − a).',
    ],
    formula: ['z′ = z + b', 'z′ = e<sup>i θ</sup> z'],
    ex: 'La rotation de centre O et d’angle π/2 transforme 1 en i, et 2 + i en −1 + 2i.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-racines',
    kicker: 'Complexes · géométrie 7',
    title: 'Racines n-ièmes de l’unité',
    thm: [
      'Les solutions de z<sup>n</sup> = 1 sont les complexes e<sup>2ikπ/n</sup>, pour k = 0, 1, …, n − 1. Leurs images sont les sommets d’un polygone régulier inscrit dans le cercle unité.',
    ],
    formula: ['z<sub>k</sub> = e<sup>2i k π / n</sup>,  k = 0, …, n − 1'],
    ex: 'z³ = 1 : les racines sont 1, e<sup>2iπ/3</sup> = −1/2 + i√3/2 et e<sup>4iπ/3</sup> = −1/2 − i√3/2 : un triangle équilatéral.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-equations',
    kicker: 'Complexes · géométrie 8',
    title: 'Résoudre z<sup>n</sup> = a',
    meth: [
      'Écrire a sous forme exponentielle a = r e<sup>iα</sup>.',
      'Les solutions sont z<sub>k</sub> = r<sup>1/n</sup> e<sup>i(α + 2kπ)/n</sup>, k = 0, …, n − 1.',
      'Placer les images : elles forment un polygone régulier centré en O.',
    ],
    ex: 'z² = i : i = e<sup>iπ/2</sup>, donc z = e<sup>iπ/4</sup> ou e<sup>i5π/4</sup>, soit (√2/2)(1 + i) ou −(√2/2)(1 + i).',
  });

  /* ==================== Divisibilité dans ℤ ==================== */

  K.slide('arithmetique-divisibilite', {
    id: 'ad-divisibilite',
    kicker: 'Divisibilité · 1',
    title: 'Divisibilité dans ℤ',
    def: [
      'Un entier a divise un entier b, noté a | b, s’il existe un entier k tel que b = a k.',
      'a est un diviseur de b, b est un multiple de a.',
    ],
    prop: [
      'Si a | b et b | c, alors a | c.',
      'Si a | b et a | c, alors a | (bu + cv) pour tous entiers u et v.',
      'Si a | b et a | c, alors a | (b + c) et a | (b − c).',
    ],
    formula: ['a | b ⟺ ∃ k ∈ ℤ, b = a k'],
    ex: '7 | 42 car 42 = 7 × 6. Les diviseurs de 12 dans ℕ sont 1, 2, 3, 4, 6 et 12.',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-division',
    kicker: 'Divisibilité · 2',
    title: 'Division euclidienne',
    thm: [
      'Pour tout entier a et tout entier b &gt; 0, il existe un unique couple (q ; r) d’entiers tel que a = bq + r et 0 ≤ r &lt; b.',
      'q est le quotient et r le reste de la division euclidienne de a par b.',
    ],
    formula: ['a = b q + r,  0 ≤ r &lt; b'],
    ex: 'Division de −17 par 5 : −17 = 5 × (−4) + 3, donc q = −4 et r = 3 (le reste est toujours positif).',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-congruences',
    kicker: 'Divisibilité · 3',
    title: 'Congruences',
    def: [
      'Deux entiers a et b sont congrus modulo n (n ≥ 1) si n divise a − b. On note a ≡ b [n].',
      'Cela signifie que a et b ont le même reste dans la division euclidienne par n.',
    ],
    prop: [
      'a ≡ b [n] ⟺ a − b = kn pour un certain entier k.',
      'Chaque entier est congru modulo n à un unique entier de {0, 1, …, n − 1}.',
    ],
    formula: ['a ≡ b [n] ⟺ n | (a − b)'],
    ex: '17 ≡ 2 [5] car 17 − 2 = 15 ; −3 ≡ 4 [7] car −3 − 4 = −7.',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-compatibilite',
    kicker: 'Divisibilité · 4',
    title: 'Calculer avec les congruences',
    prop: [
      'Si a ≡ b [n] et c ≡ d [n], alors a + c ≡ b + d [n] et ac ≡ bd [n].',
      'Pour tout entier k ≥ 0 : a<sup>k</sup> ≡ b<sup>k</sup> [n].',
      'On peut donc remplacer un nombre par son reste pour calculer des puissances énormes.',
    ],
    formula: ['a ≡ b [n] ⟹ a<sup>k</sup> ≡ b<sup>k</sup> [n]'],
    ex: '2¹⁰⁰ modulo 7 : 2³ = 8 ≡ 1, donc 2¹⁰⁰ = 2<sup>3×33+1</sup> ≡ 2 [7].',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-criteres',
    kicker: 'Divisibilité · 5',
    title: 'Critères de divisibilité',
    prop: [
      'Un entier est divisible par 3 (ou 9) si la somme de ses chiffres l’est.',
      'Il est divisible par 11 si la somme alternée de ses chiffres l’est.',
      'Il est divisible par 2, 5 ou 10 selon son dernier chiffre.',
      'Il est divisible par 4 si ses deux derniers chiffres forment un multiple de 4.',
    ],
    ex: '1 234 : somme des chiffres 10, donc non divisible par 3 ni 9 ; somme alternée 1 − 2 + 3 − 4 = −2, donc non divisible par 11.',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-equation',
    kicker: 'Divisibilité · 6',
    title: 'Résoudre ax ≡ b [n]',
    thm: [
      'L’équation ax ≡ b [n] admet des solutions si et seulement si pgcd(a ; n) divise b.',
      'Si d = pgcd(a ; n) divise b, on divise a, b et n par d pour se ramener à une équation où a est inversible modulo n.',
    ],
    formula: ['a x ≡ b [n]  soluble ⟺ pgcd(a ; n) | b'],
    ex: '2x ≡ 1 [5] : 2 est inversible modulo 5, inverse 3, donc x ≡ 3 [5]. En revanche 2x ≡ 1 [4] n’a pas de solution.',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-systemes',
    kicker: 'Divisibilité · 7',
    title: 'Systèmes de congruences',
    meth: [
      'Résoudre la première congruence et écrire x sous la forme x = x₀ + kn.',
      'Reporter dans la deuxième congruence.',
      'Résoudre la nouvelle congruence en k, puis reconstruire x.',
    ],
    ex: 'x ≡ 2 [3] et x ≡ 3 [5] : x = 2 + 3k, donc 2 + 3k ≡ 3 [5], 3k ≡ 1 [5], k ≡ 2 [5], et x ≡ 8 [15].',
  });

  K.slide('arithmetique-divisibilite', {
    id: 'ad-exemple',
    kicker: 'Divisibilité · 8',
    title: 'Une démonstration par congruence',
    def: ['Montrer que, pour tout n, 3<sup>2n</sup> − 1 est divisible par 8.'],
    prop: [
      '9 ≡ 1 [8], donc 9<sup>n</sup> ≡ 1<sup>n</sup> = 1 [8].',
      'Ainsi 3<sup>2n</sup> − 1 = 9<sup>n</sup> − 1 ≡ 0 [8].',
      'Le résultat est donc vrai pour tout entier n ≥ 0.',
    ],
    rem: 'On remplace la base par son reste modulo 8 avant d’élever à la puissance : c’est tout l’intérêt des congruences.',
  });

  /* ==================== PGCD et applications ==================== */

  K.slide('arithmetique-pgcd', {
    id: 'ap-definition',
    kicker: 'PGCD · 1',
    title: 'PGCD de deux entiers',
    def: [
      'Le PGCD de deux entiers a et b non tous nuls est le plus grand diviseur positif commun à a et b. On le note pgcd(a ; b).',
      'Deux entiers sont premiers entre eux si leur PGCD vaut 1.',
    ],
    prop: [
      'pgcd(a ; 0) = |a| et pgcd(a ; b) = pgcd(|a| ; |b|).',
      'pgcd(a ; b) = pgcd(b ; a).',
      'Les diviseurs communs de a et b sont exactement les diviseurs de leur PGCD.',
    ],
    formula: ['pgcd(a ; b) = pgcd(|a| ; |b|)'],
    ex: 'pgcd(36 ; 24) = 12 ; pgcd(17 ; 25) = 1, donc 17 et 25 sont premiers entre eux.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-euclide',
    kicker: 'PGCD · 2',
    title: 'Algorithme d’Euclide',
    thm: [
      'Si a = bq + r, alors pgcd(a ; b) = pgcd(b ; r).',
      'En répétant les divisions euclidiennes, le dernier reste non nul est le PGCD.',
    ],
    formula: ['pgcd(a ; b) = pgcd(b ; r)', 'a = b q + r'],
    ex: 'pgcd(1 078 ; 322) : 1 078 = 322 × 3 + 112 ; 322 = 112 × 2 + 98 ; 112 = 98 × 1 + 14 ; 98 = 14 × 7 + 0. Donc pgcd = 14.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-bezout',
    kicker: 'PGCD · 3',
    title: 'Théorème de Bézout',
    thm: [
      'Deux entiers a et b sont premiers entre eux si et seulement s’il existe des entiers u et v tels que au + bv = 1.',
      'Plus généralement, pgcd(a ; b) = d si et seulement s’il existe u, v tels que au + bv = d.',
    ],
    formula: ['pgcd(a ; b) = 1 ⟺ ∃ u, v ∈ ℤ, a u + b v = 1'],
    ex: 'pgcd(7 ; 5) = 1 et 3 × 7 − 4 × 5 = 1 : les coefficients de Bézout sont u = 3 et v = −4.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-gauss',
    kicker: 'PGCD · 4',
    title: 'Théorème de Gauss',
    thm: [
      'Si a divise le produit bc et si pgcd(a ; b) = 1, alors a divise c.',
    ],
    prop: [
      'Si a et b sont premiers entre eux et divisent tous les deux c, alors ab divise c.',
      'Si p est premier et p | ab, alors p | a ou p | b.',
    ],
    formula: ['a | b c  et  pgcd(a ; b) = 1  ⟹  a | c'],
    ex: '6 | 5n et pgcd(6 ; 5) = 1, donc 6 | n. Autrement dit, n est un multiple de 6.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-diophantienne',
    kicker: 'PGCD · 5',
    title: 'Équations diophantiennes',
    thm: [
      'L’équation ax + by = c (a, b non nuls) admet des solutions entières si et seulement si d = pgcd(a ; b) divise c.',
      'Si (x₀ ; y₀) est une solution, toutes les solutions sont x = x₀ + (b/d)k et y = y₀ − (a/d)k, k ∈ ℤ.',
    ],
    formula: ['a x + b y = c  soluble ⟺ pgcd(a ; b) | c'],
    ex: '5x + 7y = 1 : une solution est (3 ; −2). Les solutions sont x = 3 + 7k, y = −2 − 5k.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-ppcm',
    kicker: 'PGCD · 6',
    title: 'PPCM',
    def: [
      'Le PPCM de deux entiers positifs a et b est le plus petit multiple positif commun. On le note ppcm(a ; b).',
    ],
    prop: [
      'ppcm(a ; b) × pgcd(a ; b) = a × b.',
      'Si a et b sont premiers entre eux, ppcm(a ; b) = ab.',
      'Les multiples communs de a et b sont les multiples du PPCM.',
    ],
    formula: ['ppcm(a ; b) = ' + f('a b', 'pgcd(a ; b)')],
    ex: 'pgcd(12 ; 18) = 6, donc ppcm(12 ; 18) = 12 × 18/6 = 36.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-methode',
    kicker: 'PGCD · 7',
    title: 'Calculer un PGCD et des coefficients',
    meth: [
      'Appliquer l’algorithme d’Euclide pour trouver le PGCD.',
      'Remonter les divisions de bas en haut pour exprimer le PGCD comme combinaison de a et b.',
      'Pour une équation diophantienne, trouver une solution particulière puis ajouter la solution générale.',
    ],
    ex: 'pgcd(17 ; 7) = 1 : 17 = 7 × 2 + 3 ; 7 = 3 × 2 + 1, donc 1 = 7 − 3 × 2 = 7 − (17 − 7 × 2) × 2 = 5 × 7 − 2 × 17.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-exemple',
    kicker: 'PGCD · 8',
    title: 'Une equation diophantienne',
    def: ['Résoudre 12x + 18y = 6 dans ℤ².'],
    prop: [
      'pgcd(12 ; 18) = 6, qui divise 6 : il y a des solutions.',
      'On divise par 6 : 2x + 3y = 1.',
      'Une solution particulière est (2 ; −1) : 4 − 3 = 1.',
      'Les solutions sont x = 2 + 3k et y = −1 − 2k, k ∈ ℤ.',
    ],
    rem: 'On vérifie : 12(2 + 3k) + 18(−1 − 2k) = 24 − 18 + (36 − 36)k = 6.',
  });

  /* ==================== Nombres premiers ==================== */

  K.slide('arithmetique-premiers', {
    id: 'an-definition',
    kicker: 'Nombres premiers · 1',
    title: 'Nombres premiers',
    def: [
      'Un entier p ≥ 2 est premier s’il n’a que deux diviseurs positifs : 1 et p.',
      'Un entier ≥ 2 non premier est composé.',
    ],
    prop: [
      '2 est le seul nombre premier pair.',
      'Pour tester si n est premier, il suffit de tester les diviseurs premiers jusqu’à √n.',
      'Il existe une infinité de nombres premiers.',
    ],
    formula: ['p premier ⟺ ses seuls diviseurs sont 1 et p'],
    ex: 'Les nombres premiers inférieurs à 20 : 2, 3, 5, 7, 11, 13, 17, 19. 1 n’est pas premier ; 9 = 3² ne l’est pas non plus.',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-infini',
    kicker: 'Nombres premiers · 2',
    title: 'Une infinité de nombres premiers',
    thm: [
      'Il existe une infinité de nombres premiers.',
    ],
    prop: [
      'Démonstration par l’absurde : supposer qu’il n’y en a qu’un nombre fini p₁, …, p<sub>n</sub>.',
      'Le nombre N = p₁p₂…p<sub>n</sub> + 1 n’est divisible par aucun des p<sub>i</sub> ; il possède donc un facteur premier distinct de tous, ce qui contredit la liste.',
    ],
    ex: '2 × 3 × 5 × 7 + 1 = 211, qui est premier : il ne figurait pas dans la liste finie.',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-decomposition',
    kicker: 'Nombres premiers · 3',
    title: 'Décomposition en facteurs premiers',
    thm: [
      'Tout entier n ≥ 2 s’écrit de façon unique, à l’ordre des facteurs près, comme produit de nombres premiers.',
      'C’est le théorème fondamental de l’arithmétique.',
    ],
    formula: ['n = p₁<sup>α₁</sup> p₂<sup>α₂</sup> … p<sub>k</sub><sup>α<sub>k</sub></sup>'],
    ex: '360 = 2³ × 3² × 5 ; 7 700 = 2² × 5² × 7 × 11. L’unicité permet de comparer les diviseurs.',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-diviseurs',
    kicker: 'Nombres premiers · 4',
    title: 'Diviseurs et valuations',
    prop: [
      'Si n = p₁<sup>α₁</sup> … p<sub>k</sub><sup>α<sub>k</sub></sup>, le nombre de diviseurs positifs de n est (α₁ + 1)(α₂ + 1)…(α<sub>k</sub> + 1).',
      'Les diviseurs de n sont les produits p₁<sup>β₁</sup>…p<sub>k</sub><sup>β<sub>k</sub></sup> avec 0 ≤ β<sub>i</sub> ≤ α<sub>i</sub>.',
      'La valuation p-adique v<sub>p</sub>(n) est l’exposant de p dans la décomposition.',
    ],
    formula: ['d(n) = Π (α<sub>i</sub> + 1)'],
    ex: '360 = 2³ × 3² × 5 a (3 + 1)(2 + 1)(1 + 1) = 24 diviseurs positifs.',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-fermat',
    kicker: 'Nombres premiers · 5',
    title: 'Petit théorème de Fermat',
    thm: [
      'Si p est premier et si p ne divise pas a, alors a<sup>p−1</sup> ≡ 1 [p].',
      'Pour tout entier a, a<sup>p</sup> ≡ a [p].',
    ],
    formula: ['p premier, p ∤ a ⟹ a<sup>p−1</sup> ≡ 1 [p]'],
    ex: 'Modulo 7, 3⁶ ≡ 1, donc 3¹⁰⁰ = 3<sup>6×16+4</sup> ≡ 3⁴ = 81 ≡ 4 [7].',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-primalite',
    kicker: 'Nombres premiers · 6',
    title: 'Tester la primalité',
    meth: [
      'Si n est composé, il a un diviseur premier p ≤ √n.',
      'Tester les nombres premiers 2, 3, 5, … jusqu’à √n.',
      'Si aucun ne divise n, alors n est premier.',
    ],
    ex: 'Pour 97, √97 ≈ 9,8 : tester 2, 3, 5 et 7. Aucun ne divise 97, donc 97 est premier. Pour 91 = 7 × 13, le test s’arrête à 7.',
  });

  K.slide('arithmetique-premiers', {
    id: 'an-exemple',
    kicker: 'Nombres premiers · 7',
    title: 'Simplifier une fraction',
    meth: [
      'Décomposer le numérateur et le dénominateur en facteurs premiers.',
      'Simplifier les exposants communs.',
      'Lire le PGCD comme produit des facteurs communs avec le plus petit exposant.',
    ],
    ex: '360/756 : 360 = 2³ × 3² × 5 et 756 = 2² × 3³ × 7, donc pgcd = 2² × 3² = 36 et 360/756 = 10/21.',
  });

  /* ==================== Calcul matriciel et applications aux graphes ==================== */

  K.slide('matrices-graphes', {
    id: 'mg-definition',
    kicker: 'Matrices · 1',
    title: 'Une matrice est un tableau de nombres',
    def: [
      'Une matrice de taille n × p est un tableau de n lignes et p colonnes de nombres réels. On note a<sub>ij</sub> le coefficient de la ligne i et de la colonne j.',
      'Une matrice carrée a autant de lignes que de colonnes. Une matrice colonne a une seule colonne ; une matrice ligne une seule ligne.',
    ],
    formula: ['A = ' + mat([['2', '1', '0'], ['3', '−1', '4']]) + '  (2 × 3)'],
    ex: 'La matrice nulle O a tous ses coefficients nuls. La matrice identité I<sub>n</sub> a des 1 sur la diagonale et des 0 ailleurs.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-operations',
    kicker: 'Matrices · 2',
    title: 'Addition et multiplication par un réel',
    def: [
      'Deux matrices de même taille s’additionnent coefficient par coefficient. On multiplie une matrice par un réel en multipliant chaque coefficient.',
    ],
    prop: [
      'A + B = B + A et A + (B + C) = (A + B) + C.',
      'λ(A + B) = λA + λB.',
      'La transposée A<sup>T</sup> échange les lignes et les colonnes : (A<sup>T</sup>)<sub>ij</sub> = a<sub>ji</sub>.',
      'Une matrice est symétrique si A<sup>T</sup> = A.',
    ],
    formula: ['(A + B)<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>', '(A<sup>T</sup>)<sub>ij</sub> = a<sub>ji</sub>'],
    ex: 'A = ' + mat([['1', '2'], ['3', '4']]) + ' et B = ' + mat([['0', '5'], ['−1', '2']]) + ' : A + B = ' + mat([['1', '7'], ['2', '6']]) + '.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-produit',
    kicker: 'Matrices · 3',
    title: 'Produit matriciel',
    def: [
      'Si A est de taille n × p et B de taille p × m, le produit AB est de taille n × m, avec (AB)<sub>ij</sub> = Σ<sub>k=1</sub><sup>p</sup> a<sub>ik</sub>b<sub>kj</sub> : on multiplie la ligne i de A par la colonne j de B.',
    ],
    prop: [
      'Le produit n’est défini que si le nombre de colonnes de A est le nombre de lignes de B.',
      'Le produit matriciel est associatif mais pas commutatif en général : AB ≠ BA.',
      'AI = IA = A.',
    ],
    formula: ['(AB)<sub>ij</sub> = Σ<sub>k</sub> a<sub>ik</sub> b<sub>kj</sub>'],
    ex: 'A = ' + mat([['1', '2'], ['0', '1']]) + ' et B = ' + mat([['3', '0'], ['1', '2']]) + ' : AB = ' + mat([['5', '4'], ['1', '2']]) + ', tandis que BA = ' + mat([['3', '6'], ['1', '4']]) + '.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-produit-visuel',
    kicker: 'Matrices · 4',
    title: 'Voir le produit ligne × colonne',
    def: [
      'Pour calculer le coefficient (i ; j) de AB, on multiplie la ligne i de A par la colonne j de B, puis on additionne les produits.',
    ],
    main:
      '<div class="mat-lab">' +
      '<div class="mat-products">' +
      '<span class="mat-name">A</span>' +
      mat([['1', '2'], ['0', '1']], { name: 'A' }) +
      '<span class="mat-times">×</span>' +
      '<span class="mat-name">B</span>' +
      mat([['3', '0'], ['1', '2']], { name: 'B' }) +
      '<span class="mat-eq">=</span>' +
      '<span class="mat-name">AB</span>' +
      mat([['5', '4'], ['1', '2']], { name: 'AB', interactive: true, label: 'Produit AB' }) +
      '</div>' +
      '<p class="mat-hint" id="mat-prod-hint">Clique sur un coefficient de AB pour voir le calcul.</p>' +
      '</div>',
    after(el) {
      const A = [[1, 2], [0, 1]];
      const B = [[3, 0], [1, 2]];
      const AB = [[5, 4], [1, 2]];
      const result = el.querySelector('[data-mat="AB"]');
      const hint = el.querySelector('#mat-prod-hint');
      if (!result || !hint) return;
      result.addEventListener('click', (event) => {
        const button = event.target.closest('button.mat-cell');
        if (!button) return;
        const i = Number(button.dataset.i);
        const j = Number(button.dataset.j);
        el.querySelectorAll('[data-mat="A"] .mat-cell').forEach((cell) => {
          cell.classList.toggle('hl', Number(cell.dataset.i) === i);
        });
        el.querySelectorAll('[data-mat="B"] .mat-cell').forEach((cell) => {
          cell.classList.toggle('hl', Number(cell.dataset.j) === j);
        });
        const terms = A[i].map((a, k) => `${a} × ${B[k][j]}`);
        hint.innerHTML =
          `<strong>(AB)<sub>${i + 1}${j + 1}</sub> = ${terms.join(' + ')} = ${AB[i][j]}</strong>` +
          ` — ligne ${i + 1} de A, colonne ${j + 1} de B.`;
      });
    },
    rem: 'Le produit n’est pas commutatif : refaire le calcul dans l’autre sens donne une autre matrice.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-inverse',
    kicker: 'Matrices · 5',
    title: 'Inverse d’une matrice',
    def: [
      'Une matrice carrée A est inversible s’il existe une matrice B telle que AB = BA = I. On note B = A<sup>−1</sup>.',
      'Pour une matrice 2 × 2, A = ' + mat([['a', 'b'], ['c', 'd']]) + ' est inversible si et seulement si ad − bc ≠ 0, et A<sup>−1</sup> = ' + f('1', 'ad − bc') + mat([['d', '−b'], ['−c', 'a']]) + '.',
    ],
    formula: ['A A<sup>−1</sup> = A<sup>−1</sup> A = I', 'det A = ad − bc'],
    ex: 'A = ' + mat([['2', '1'], ['1', '1']]) + ' : det A = 1, donc A<sup>−1</sup> = ' + mat([['1', '−1'], ['−1', '2']]) + '.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-systemes',
    kicker: 'Matrices · 6',
    title: 'Matrices et systèmes linéaires',
    prop: [
      'Le système ' + mat([['a', 'b'], ['c', 'd']]) + mat([['x'], ['y']]) + ' = ' + mat([['e'], ['f']]) + ' s’écrit AX = B.',
      'Si A est inversible, la solution est unique : X = A<sup>−1</sup>B.',
      'Si A n’est pas inversible, le système a soit aucune solution, soit une infinité.',
    ],
    formula: ['A X = B ⟹ X = A<sup>−1</sup> B'],
    ex: 'x + y = 3 et x − y = 1 : A = ' + mat([['1', '1'], ['1', '−1']]) + ', det = −2 et X = ' + mat([['2'], ['1']]) + '.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-puissances',
    kicker: 'Matrices · 7',
    title: 'Puissances d’une matrice',
    def: [
      'Pour une matrice carrée A, on pose A⁰ = I et A<sup>n+1</sup> = A<sup>n</sup>A.',
    ],
    meth: [
      'Calculer A², A³ et conjecturer une formule.',
      'Démontrer la formule par récurrence.',
      'Si A = I + N avec N nilpotente, utiliser la formule du binôme, qui s’arrête.',
    ],
    formula: ['A<sup>n+1</sup> = A<sup>n</sup> A', 'A<sup>n</sup> A<sup>m</sup> = A<sup>n+m</sup>'],
    ex: 'A = ' + mat([['1', '1'], ['0', '1']]) + ' : A<sup>n</sup> = ' + mat([['1', 'n'], ['0', '1']]) + ' pour tout n ≥ 1.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-graphes',
    kicker: 'Graphes · 8',
    title: 'Graphes : le vocabulaire',
    def: [
      'Un graphe est un ensemble de sommets reliés par des arêtes. L’ordre est le nombre de sommets ; le degré d’un sommet est le nombre d’arêtes qui y aboutissent.',
      'Une chaîne relie des sommets successifs ; sa longueur est son nombre d’arêtes. Un graphe est connexe si deux sommets quelconques sont reliés par une chaîne.',
      'Un graphe est complet si tous ses sommets sont deux à deux adjacents.',
    ],
    formula: ['ordre = nombre de sommets', 'Σ degrés = 2 × nombre d’arêtes'],
    ex: 'Le graphe complet K<sub>n</sub> a n(n − 1)/2 arêtes : K₄ a 6 arêtes et chaque sommet est de degré 3.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-adjacence',
    kicker: 'Graphes · 9',
    title: 'Matrice d’adjacence',
    def: [
      'Pour un graphe d’ordre n dont les sommets sont numérotés de 1 à n, la matrice d’adjacence A est la matrice n × n telle que a<sub>ij</sub> est le nombre d’arêtes reliant i à j.',
      'Pour un graphe non orienté, A est symétrique et la somme des coefficients de la ligne i est le degré du sommet i.',
    ],
    formula: ['a<sub>ij</sub> = nombre d’arêtes entre i et j'],
    ex: 'Un graphe à 3 sommets avec les arêtes 1–2 et 2–3 a pour matrice ' + mat([['0', '1', '0'], ['1', '0', '1'], ['0', '1', '0']]) + '.',
  });

  K.slide('matrices-graphes', {
    id: 'mg-chemins',
    kicker: 'Graphes · 10',
    title: 'Chemins de longueur k',
    thm: [
      'Le coefficient (i ; j) de la matrice A<sup>k</sup> est le nombre de chaînes de longueur k reliant le sommet i au sommet j.',
    ],
    formula: ['(A<sup>k</sup>)<sub>ij</sub> = nombre de chaînes de longueur k de i à j'],
    ex: 'Dans K₄, A² a 3 sur la diagonale et 2 hors diagonale : depuis un sommet, il y a 3 chaînes de longueur 2 qui reviennent au départ et 2 pour aller vers chacun des autres.',
  });

  /* ==================== Suites et matrices ==================== */

  K.slide('suites-matrices', {
    id: 'sm-suite',
    kicker: 'Suites et matrices · 1',
    title: 'Suites de matrices colonnes',
    def: [
      'Une suite de matrices colonnes (U<sub>n</sub>) est définie par une relation U<sub>n+1</sub> = A U<sub>n</sub> + B, où A est une matrice carrée et B une matrice colonne.',
      'Les coefficients de U<sub>n</sub> sont les termes de plusieurs suites scalaires couplées.',
    ],
    formula: ['U<sub>n+1</sub> = A U<sub>n</sub> + B'],
    ex: 'U<sub>n</sub> = ' + mat([['a<sub>n</sub>'], ['b<sub>n</sub>']]) + ' et A = ' + mat([['0,8', '0,1'], ['0,2', '0,9']]) + ' : chaque terme dépend des deux termes précédents.',
  });

  K.slide('suites-matrices', {
    id: 'sm-systeme',
    kicker: 'Suites et matrices · 2',
    title: 'Un système de suites',
    def: [
      'Le système a<sub>n+1</sub> = 0,8a<sub>n</sub> + 0,1b<sub>n</sub> ; b<sub>n+1</sub> = 0,2a<sub>n</sub> + 0,9b<sub>n</sub> s’écrit U<sub>n+1</sub> = A U<sub>n</sub> avec A = ' + mat([['0,8', '0,1'], ['0,2', '0,9']]) + '.',
    ],
    prop: [
      'Alors U<sub>n</sub> = A<sup>n</sup> U₀.',
      'Si la suite converge vers U, alors U = A U : c’est un état stable.',
    ],
    formula: ['U<sub>n</sub> = A<sup>n</sup> U₀'],
  });

  K.slide('suites-matrices', {
    id: 'sm-point-fixe',
    kicker: 'Suites et matrices · 3',
    title: 'État stable',
    def: [
      'Un état stable de la suite U<sub>n+1</sub> = A U<sub>n</sub> + B est une matrice colonne L telle que L = A L + B.',
    ],
    prop: [
      'On le trouve en résolvant le système (I − A)L = B.',
      'Si l’on pose V<sub>n</sub> = U<sub>n</sub> − L, alors V<sub>n+1</sub> = A V<sub>n</sub>.',
      'La suite converge vers L lorsque A<sup>n</sup> tend vers la matrice nulle.',
    ],
    formula: ['L = A L + B', 'V<sub>n+1</sub> = A V<sub>n</sub>'],
    ex: 'Pour A = ' + mat([['0,8', '0,1'], ['0,2', '0,9']]) + ', le système L = AL donne L₁ = L₂ : tout état de la forme (s ; s) est stable.',
  });

  K.slide('suites-matrices', {
    id: 'sm-graphe-proba',
    kicker: 'Suites et matrices · 4',
    title: 'Graphes probabilistes',
    def: [
      'Un graphe probabiliste a des sommets et des arêtes pondérées par des probabilités. La somme des probabilités des arêtes qui partent d’un sommet vaut 1.',
      'La matrice de transition P est telle que p<sub>ij</sub> est la probabilité d’aller de i vers j. Ses coefficients sont positifs et chaque ligne somme à 1.',
    ],
    formula: ['P = (p<sub>ij</sub>),  Σ<sub>j</sub> p<sub>ij</sub> = 1'],
    ex: 'Deux états A et B : P = ' + mat([['0,7', '0,3'], ['0,4', '0,6']]) + '. Depuis A, on reste en A avec probabilité 0,7 et on va en B avec 0,3.',
  });

  K.slide('suites-matrices', {
    id: 'sm-markov',
    kicker: 'Suites et matrices · 5',
    title: 'Chaîne de Markov',
    def: [
      'Une chaîne de Markov à deux ou trois états est décrite par un graphe probabiliste et une distribution initiale π₀. La distribution après n étapes est π<sub>n</sub> = π₀ P<sup>n</sup>.',
    ],
    prop: [
      'Les coefficients de π<sub>n</sub> sont des probabilités : ils sont positifs et leur somme vaut 1.',
      'La matrice de transition et la distribution initiale suffisent à décrire toute l’évolution.',
    ],
    formula: ['π<sub>n</sub> = π₀ P<sup>n</sup>'],
    ex: 'π₀ = (0,5 ; 0,5) et P = ' + mat([['0,7', '0,3'], ['0,4', '0,6']]) + ' : π₁ = (0,55 ; 0,45).',
  });

  K.slide('suites-matrices', {
    id: 'sm-invariante',
    kicker: 'Suites et matrices · 6',
    title: 'Distribution invariante',
    def: [
      'Une distribution π est invariante (ou stationnaire) si π P = π et si la somme de ses coefficients vaut 1.',
    ],
    meth: [
      'Écrire π = (x ; 1 − x) pour deux états.',
      'Traduire πP = π par une équation en x.',
      'Résoudre et vérifier que les coefficients sont dans [0 ; 1].',
    ],
    formula: ['π P = π,  Σ π<sub>i</sub> = 1'],
    ex: 'Pour P = ' + mat([['0,7', '0,3'], ['0,4', '0,6']]) + ', π = (4/7 ; 3/7) est invariante : 4/7 × 0,3 + 3/7 × 0,6 = 3/7.',
  });

  K.slide('suites-matrices', {
    id: 'sm-convergence',
    kicker: 'Suites et matrices · 7',
    title: 'Convergence vers l’état stable',
    prop: [
      'Si la matrice de transition n’a que des coefficients strictement positifs, alors P<sup>n</sup> converge vers une matrice dont toutes les lignes sont égales à la distribution invariante π.',
      'Quelle que soit la distribution initiale, π<sub>n</sub> converge donc vers π.',
    ],
    formula: ['π<sub>n</sub> → π'],
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -0.8, xmax: 12.4, ymin: 0.3, ymax: 0.75 },
        stretch: true,
        params: [
          { key: 'p', label: 'probabilité A → A', min: 0.5, max: 0.95, step: 0.01, value: 0.7 },
          { key: 'q', label: 'probabilité B → B', min: 0.5, max: 0.95, step: 0.01, value: 0.6 },
        ],
        draw(p) {
          const pAA = p.state.p;
          const pBB = p.state.q;
          const P = [[pAA, 1 - pAA], [1 - pBB, pBB]];
          let pi = [0.5, 0.5];
          const a = [];
          const b = [];
          for (let n = 0; n <= 12; n += 1) {
            a.push([n, pi[0]]);
            b.push([n, pi[1]]);
            pi = [
              pi[0] * P[0][0] + pi[1] * P[1][0],
              pi[0] * P[0][1] + pi[1] * P[1][1],
            ];
          }
          const stable = (1 - pBB) / (2 - pAA - pBB);
          p.hline(stable, { color: 'rgba(180, 168, 240, 0.55)', dash: [5, 5], width: 1.4 });
          p.text(11.7, stable, 'π', { color: C.VIOLET, align: 'right', dy: -9, bold: true });
          for (let n = 1; n < a.length; n += 1) {
            p.line(a[n - 1][0], a[n - 1][1], a[n][0], a[n][1], { color: C.ACCENT, width: 2 });
            p.line(b[n - 1][0], b[n - 1][1], b[n][0], b[n][1], { color: C.SIN, width: 2 });
          }
          G.dots(p, a, { color: C.ACCENT, r: 3.5 });
          G.dots(p, b, { color: C.SIN, r: 3.5 });
        },
        readout(s) {
          const x = (1 - s.q) / (2 - s.p - s.q);
          return (
            `<div class="kv"><dt>distribution invariante</dt><dd>(${M.com(x, 3)} ; ${M.com(1 - x, 3)})</dd></div>` +
            `<div class="kv"><dt>étapes</dt><dd>n = 12</dd></div>`
          );
        },
        caption: 'Probabilité d’être en A (beige) et en B (vert) au fil des étapes.',
      });
    },
    ex: 'Avec P = ' + mat([['0,7', '0,3'], ['0,4', '0,6']]) + ', π<sub>n</sub> se rapproche de (4/7 ; 3/7) : environ (0,57 ; 0,43) après quelques étapes.',
  });

  K.slide('suites-matrices', {
    id: 'sm-exemple',
    kicker: 'Suites et matrices · 8',
    title: 'Un exemple complet',
    def: [
      'Chaque jour, 80 % des clients d’un magasin A y reviennent et 20 % vont en B ; 30 % des clients de B vont en A et 70 % y restent.',
    ],
    prop: [
      'P = ' + mat([['0,8', '0,2'], ['0,3', '0,7']]) + '.',
      'La distribution invariante vérifie πP = π : on trouve π = (0,6 ; 0,4).',
      'À long terme, 60 % des clients vont en A et 40 % en B, quelle que soit la répartition initiale.',
    ],
    rem: 'On vérifie : 0,6 × 0,2 = 0,12 et 0,4 × 0,3 = 0,12, donc la masse qui passe de A vers B est compensée.',
  });
})();
