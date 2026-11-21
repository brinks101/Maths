// Mathématiques expertes — nombres complexes, arithmétique, graphes et matrices.
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;
  const zbar = '<span class="ovl">z</span>';

  function mat(rows) {
    return (
      '<span class="matrix">' +
      rows.map((row) => row.map((cell) => `<span>${cell}</span>`).join('')).join('') +
      '</span>'
    );
  }

  /* ==================== Nombres complexes : algèbre ==================== */

  K.slide('complexes-algebrique', {
    id: 'ca-definition',
    kicker: 'Nombres complexes · 1',
    title: 'Un nombre qui n’existait pas',
    formula: ['i² = −1', 'z = a + i b', 'a = Re(z),  b = Im(z)'],
    line: 'On calcule avec i comme avec une lettre, en remplaçant i² par −1.',
    size: 'lg',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-operations',
    kicker: 'Nombres complexes · 2',
    title: 'Addition et produit',
    formula: ['(a + ib) + (c + id) = (a + c) + i(b + d)', '(a + ib)(c + id) = (ac − bd) + i(ad + bc)'],
    line: 'On développe, puis on regroupe les termes réels et imaginaires.',
    size: 'lg',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-conjugue',
    kicker: 'Nombres complexes · 3',
    title: 'Le conjugué',
    formula: [`z = a + ib,  ${zbar} = a − ib`, `z ${zbar} = a² + b²`],
    line: 'Le conjugué rend le produit réel : il sert à rendre un dénominateur réel.',
    size: 'lg',
  });

  K.slide('complexes-algebrique', {
    id: 'ca-module',
    kicker: 'Nombres complexes · 4',
    title: 'Le module, une distance',
    formula: ['|z| = √(a² + b²)', '|z|² = z ' + zbar],
    line: 'Dans le plan complexe, |z| est la distance de l’origine au point d’affixe z.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
        params: [
          { key: 'a', label: 'partie réelle', min: -3, max: 3, step: 0.5, value: 2, decimals: 1 },
          { key: 'b', label: 'partie imaginaire', min: -3, max: 3, step: 0.5, value: 1, decimals: 1 },
        ],
        draw(p) {
          const a = p.state.a;
          const b = p.state.b;
          p.line(0, 0, a, b, { color: C.ACCENT, width: 2.6 });
          p.dot(a, b, { color: C.ACCENT, r: 5.5, label: 'M(z)' });
          p.dot(a, -b, { color: C.SIN, r: 4.5, label: 'M(z̄)' });
          p.line(a, b, a, 0, { color: 'rgba(246, 241, 232, 0.25)', dash: [4, 4] });
          p.line(a, 0, 0, 0, { color: 'rgba(246, 241, 232, 0.25)', dash: [4, 4] });
        },
        readout(s) {
          return `z = ${M.com(s.a, 1)} + ${M.com(s.b, 1)}i · |z| = ${M.com(Math.hypot(s.a, s.b))}`;
        },
      });
    },
  });

  K.slide('complexes-algebrique', {
    id: 'ca-second-degre',
    kicker: 'Nombres complexes · 5',
    title: 'Second degré à discriminant négatif',
    formula: ['Δ < 0  ⟹  Δ = −(√(−Δ))²', `z = ${f('−b ± i√(−Δ)', '2a')}`],
    line: 'Les deux solutions sont conjuguées.',
    size: 'lg',
  });

  /* ==================== Nombres complexes : géométrie ==================== */

  K.slide('complexes-trigo', {
    id: 'ct-forme-trigo',
    kicker: 'Complexes et géométrie · 1',
    title: 'Module et argument',
    formula: ['z = r(cos θ + i sin θ)', 'r = |z|,  θ = arg(z)  [2π]'],
    line: 'r est la distance à l’origine, θ l’angle avec l’axe des réels.',
    size: 'lg',
  });

  K.slide('complexes-trigo', {
    id: 'ct-exponentielle',
    kicker: 'Complexes et géométrie · 2',
    title: 'La notation exponentielle',
    formula: ['e<sup>iθ</sup> = cos θ + i sin θ', 'z = r e<sup>iθ</sup>'],
    line: 'Le cercle unité se parcourt avec θ : c’est la forme la plus efficace pour les produits.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6 },
        params: [{ key: 'deg', label: 'angle θ', min: 0, max: 360, step: 5, value: 45, decimals: 0, format: (v) => `${v}°` }],
        draw(p) {
          const t = (p.state.deg * Math.PI) / 180;
          p.plot((x) => Math.sqrt(Math.max(0, 1 - x * x)), { color: 'rgba(246, 241, 232, 0.4)', width: 2 });
          p.plot((x) => -Math.sqrt(Math.max(0, 1 - x * x)), { color: 'rgba(246, 241, 232, 0.4)', width: 2 });
          p.line(0, 0, Math.cos(t), Math.sin(t), { color: C.ACCENT, width: 2.6 });
          p.dot(Math.cos(t), Math.sin(t), { color: C.ACCENT, r: 5.5, label: 'M' });
          p.line(Math.cos(t), 0, Math.cos(t), Math.sin(t), { color: C.SIN, width: 3 });
          p.line(0, 0, Math.cos(t), 0, { color: C.COS, width: 4 });
        },
        readout(s) {
          const t = (s.deg * Math.PI) / 180;
          return `cos θ = ${M.com(Math.cos(t))} · sin θ = ${M.com(Math.sin(t))}`;
        },
      });
    },
  });

  K.slide('complexes-trigo', {
    id: 'ct-produit',
    kicker: 'Complexes et géométrie · 3',
    title: 'Produit et quotient',
    formula: ['(r e<sup>iθ</sup>)(r′ e<sup>iθ′</sup>) = rr′ e<sup>i(θ+θ′)</sup>', f('r e<sup>iθ</sup>', 'r′ e<sup>iθ′</sup>') + ' = ' + f('r', 'r′') + ' e<sup>i(θ−θ′)</sup>'],
    line: 'Les modules se multiplient, les arguments s’ajoutent.',
    size: 'lg',
  });

  K.slide('complexes-trigo', {
    id: 'ct-moivre',
    kicker: 'Complexes et géométrie · 4',
    title: 'Formule de Moivre',
    formula: ['(cos θ + i sin θ)<sup>n</sup> = cos(nθ) + i sin(nθ)'],
    line: 'Elle donne les racines n-ièmes et linéarise les puissances.',
  });

  K.slide('complexes-trigo', {
    id: 'ct-transformations',
    kicker: 'Complexes et géométrie · 5',
    title: 'Traduire une transformation',
    formula: ['z ↦ z + b : translation', 'z ↦ e<sup>iθ</sup> z : rotation d’angle θ', '|z<sub>B</sub> − z<sub>A</sub>| = AB'],
    line: 'Le calcul complexe remplace les calculs de distances et d’angles.',
    size: 'lg',
  });

  /* ==================== Équations polynomiales ==================== */

  K.slide('polynomes-complexes', {
    id: 'pc-racines',
    kicker: 'Équations polynomiales · 1',
    title: 'Autant de racines que le degré',
    formula: ['P de degré n  ⟹  n racines complexes, avec multiplicité'],
    line: 'Dans ℂ, un polynôme non constant est toujours scindé.',
  });

  K.slide('polynomes-complexes', {
    id: 'pc-factorisation',
    kicker: 'Équations polynomiales · 2',
    title: 'Factoriser avec les racines',
    formula: ['P(z) = a(z − z₁)(z − z₂)…(z − z<sub>n</sub>)'],
    line: 'Connaître toutes les racines, c’est connaître le polynôme à un facteur près.',
  });

  K.slide('polynomes-complexes', {
    id: 'pc-racines-unite',
    kicker: 'Équations polynomiales · 3',
    title: 'Les racines n-ièmes de l’unité',
    formula: ['z<sup>n</sup> = 1  ⟺  z = e<sup>2ikπ/n</sup>,  k = 0, 1, …, n − 1'],
    line: 'Elles forment un polygone régulier inscrit dans le cercle unité.',
  });

  K.slide('polynomes-complexes', {
    id: 'pc-exemple',
    kicker: 'Équations polynomiales · 4',
    title: 'Un exemple : z³ = 1',
    formula: ['z₀ = 1,  z₁ = e<sup>2iπ/3</sup>,  z₂ = e<sup>4iπ/3</sup>', 'z³ − 1 = (z − 1)(z² + z + 1)'],
    line: 'Les trois racines sont les sommets d’un triangle équilatéral.',
    size: 'lg',
  });

  /* ==================== Divisibilité et congruences ==================== */

  K.slide('arithmetique-congruences', {
    id: 'ac-divisibilite',
    kicker: 'Arithmétique · 1',
    title: 'Divisibilité dans ℤ',
    formula: ['a | b  ⟺  ∃ k ∈ ℤ,  b = ka'],
    line: 'Si a divise b et c, alors a divise toute combinaison linéaire ub + vc.',
  });

  K.slide('arithmetique-congruences', {
    id: 'ac-division-euclidienne',
    kicker: 'Arithmétique · 2',
    title: 'Division euclidienne',
    formula: ['a = bq + r', '0 ≤ r < b'],
    line: 'Le quotient q et le reste r sont uniques.',
  });

  K.slide('arithmetique-congruences', {
    id: 'ac-congruences',
    kicker: 'Arithmétique · 3',
    title: 'Les congruences',
    formula: ['a ≡ b [n]  ⟺  n | (a − b)'],
    line: 'On ne garde que le reste : 17 ≡ 2 [5].',
  });

  K.slide('arithmetique-congruences', {
    id: 'ac-compatibilite',
    kicker: 'Arithmétique · 4',
    title: 'Calculer modulo n',
    formula: ['a ≡ b  ⟹  a + c ≡ b + c', 'a ≡ b  ⟹  ac ≡ bc', 'a ≡ b  ⟹  a<sup>k</sup> ≡ b<sup>k</sup>'],
    line: 'Les congruences se comportent bien avec l’addition et la multiplication.',
    size: 'lg',
  });

  K.slide('arithmetique-congruences', {
    id: 'ac-criteres',
    kicker: 'Arithmétique · 5',
    title: 'Critères de divisibilité',
    formula: ['3 et 9 : somme des chiffres', '11 : somme alternée des chiffres'],
    line: 'Ils viennent des congruences modulo 3, 9 et 11.',
  });

  /* ==================== PGCD et nombres premiers ==================== */

  K.slide('arithmetique-pgcd', {
    id: 'ap-euclide',
    kicker: 'PGCD · 1',
    title: 'L’algorithme d’Euclide',
    formula: ['pgcd(a ; b) = pgcd(b ; r)', 'a = bq + r'],
    line: 'On remplace le couple par le diviseur et le reste, jusqu’à zéro.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-bezout',
    kicker: 'PGCD · 2',
    title: 'Théorème de Bézout',
    formula: ['pgcd(a ; b) = 1  ⟺  ∃ u, v ∈ ℤ,  au + bv = 1'],
    line: 'L’égalité de Bézout se remonte pas à pas depuis l’algorithme d’Euclide.',
    size: 'lg',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-gauss',
    kicker: 'PGCD · 3',
    title: 'Théorème de Gauss',
    formula: ['a | bc  et  pgcd(a ; b) = 1  ⟹  a | c'],
    line: 'Si a est premier avec b, il doit diviser c tout seul.',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-premiers',
    kicker: 'PGCD · 4',
    title: 'Les nombres premiers',
    formula: ['p premier : ses seuls diviseurs sont 1 et p', 'tout entier > 1 se décompose en facteurs premiers'],
    line: 'Il y a une infinité de nombres premiers, et la décomposition est unique.',
    size: 'lg',
  });

  K.slide('arithmetique-pgcd', {
    id: 'ap-fermat',
    kicker: 'PGCD · 5',
    title: 'Petit théorème de Fermat',
    formula: ['p premier, p ∤ a  ⟹  a<sup>p−1</sup> ≡ 1 [p]'],
    line: 'Il permet de calculer des puissances énormes modulo p.',
  });

  /* ==================== Graphes ==================== */

  K.slide('graphes', {
    id: 'gr-vocabulaire',
    kicker: 'Graphes · 1',
    title: 'Sommets et arêtes',
    formula: ['G = (S ; A)', 'ordre = nombre de sommets', 'degré = nombre d’arêtes incidentes'],
    line: 'Un graphe modélise des liens : routes, amitiés, réseaux.',
    size: 'lg',
  });

  K.slide('graphes', {
    id: 'gr-degres',
    kicker: 'Graphes · 2',
    title: 'Le lemme des poignées de main',
    formula: ['Σ deg(s) = 2 × nombre d’arêtes'],
    line: 'La somme des degrés est toujours paire.',
  });

  K.slide('graphes', {
    id: 'gr-chaines',
    kicker: 'Graphes · 3',
    title: 'Chaînes et connexité',
    formula: ['une chaîne relie des sommets adjacents', 'graphe connexe : tout sommet est joignable'],
    line: 'La longueur d’une chaîne est son nombre d’arêtes.',
    size: 'lg',
  });

  K.slide('graphes', {
    id: 'gr-figure',
    kicker: 'Graphes · 4',
    title: 'Le graphe complet K₄',
    formula: ['K<sub>n</sub> : ' + f('n(n − 1)', '2') + ' arêtes'],
    line: 'Chaque sommet est relié à tous les autres.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6 },
        params: [],
        draw(p) {
          const pts = [
            [0, 1.2],
            [1.2, 0],
            [0, -1.2],
            [-1.2, 0],
          ];
          pts.forEach((a, i) => {
            pts.forEach((b, j) => {
              if (j > i) p.line(a[0], a[1], b[0], b[1], { color: 'rgba(227, 199, 158, 0.45)', width: 1.6 });
            });
          });
          pts.forEach(([x, y], i) => {
            p.dot(x, y, { color: C.ACCENT, r: 9 });
            p.text(x, y, String(i + 1), { align: 'center', color: '#1a1613', size: 12, bold: true });
          });
        },
      });
    },
  });

  K.slide('graphes', {
    id: 'gr-adjacence',
    kicker: 'Graphes · 5',
    title: 'La matrice d’adjacence',
    formula: ['a<sub>ij</sub> = 1 si i et j sont adjacents, 0 sinon'],
    line: 'Les coefficients de A<sup>k</sup> comptent les chaînes de longueur k.',
  });

  /* ==================== Matrices et chaînes de Markov ==================== */

  K.slide('matrices', {
    id: 'ma-definition',
    kicker: 'Matrices · 1',
    title: 'Une matrice est un tableau de nombres',
    formula: ['A = ' + mat([['2', '1'], ['0', '3']]) + '  de taille 2 × 2'],
    line: 'On lit d’abord le nombre de lignes, puis le nombre de colonnes.',
    size: 'lg',
  });

  K.slide('matrices', {
    id: 'ma-produit',
    kicker: 'Matrices · 2',
    title: 'Le produit matriciel',
    formula: ['(AB)<sub>ij</sub> = Σ<sub>k</sub> a<sub>ik</sub> b<sub>kj</sub>'],
    line: 'Ligne fois colonne ; le produit n’est pas commutatif en général.',
  });

  K.slide('matrices', {
    id: 'ma-identite',
    kicker: 'Matrices · 3',
    title: 'Identité et inverse',
    formula: ['AI = IA = A', 'A A<sup>−1</sup> = I'],
    line: 'L’inverse n’existe pas toujours : il faut un déterminant non nul.',
    size: 'lg',
  });

  K.slide('matrices', {
    id: 'ma-puissances',
    kicker: 'Matrices · 4',
    title: 'Puissances d’une matrice',
    formula: ['A² = A × A', 'A<sup>n+1</sup> = A<sup>n</sup> A'],
    line: 'On diagonalise ou on cherche une récurrence pour éviter les calculs répétés.',
    size: 'lg',
  });

  K.slide('matrices', {
    id: 'ma-suites',
    kicker: 'Matrices · 5',
    title: 'Suites de matrices',
    formula: ['U<sub>n+1</sub> = A U<sub>n</sub> + C', 'U<sub>n</sub> = A<sup>n</sup> U₀ + …'],
    line: 'Un système de suites récurrentes s’écrit avec une seule matrice.',
  });

  K.slide('matrices', {
    id: 'ma-markov',
    kicker: 'Matrices · 6',
    title: 'Chaînes de Markov',
    formula: ['P = ' + mat([['0,8', '0,3'], ['0,2', '0,7']]), 'état stable : Pπ = π'],
    line: 'Chaque colonne somme à 1 : les probabilités se conservent.',
    size: 'lg',
  });
})();
