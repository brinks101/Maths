// Automatismes (2/2): calcul littéral, équations, valeur absolue, dérivées.
// One idea and its formulas per slide.
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;

  /* ---------------- Calcul littéral ---------------- */

  K.slide('calcul-litteral', {
    id: 'calc-dev',
    kicker: 'Calcul littéral · 1',
    title: 'Développer, c’est distribuer',
    formula: ['k(a + b) = ka + kb', '(a + b)(c + d) = ac + ad + bc + bd'],
    line: 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde.',
  });

  K.slide('calcul-litteral', {
    id: 'calc-identites',
    kicker: 'Calcul littéral · 2',
    title: 'Les trois identités remarquables',
    formula: [
      '(a + b)² = a² + 2ab + b²',
      '(a − b)² = a² − 2ab + b²',
      '(a + b)(a − b) = a² − b²',
    ],
    line: 'Le double produit est le terme qu’on oublie le plus souvent.',
  });

  K.slide('calcul-litteral', {
    id: 'calc-identites-exemple',
    kicker: 'Calcul littéral · 3',
    title: 'Les reconnaître en calcul',
    formula: [
      '(2x − 3)² = 4x² − 12x + 9',
      '(3x + 1)(3x − 1) = 9x² − 1',
      'x² − 25 = (x − 5)(x + 5)',
    ],
    line: 'Développer va de la gauche vers la droite ; factoriser, de la droite vers la gauche.',
    size: 'lg',
  });

  K.slide('calcul-litteral', {
    id: 'calc-factoriser',
    kicker: 'Calcul littéral · 4',
    title: 'Factoriser : une somme devient un produit',
    formula: ['ka + kb = k(a + b)', 'a² − b² = (a − b)(a + b)', 'x² + bx + c = (x − x₁)(x − x₂)'],
    line: 'Chercher d’abord un facteur commun, puis une identité, puis les racines.',
    size: 'lg',
  });

  /* ---------------- Équations et inéquations ---------------- */

  K.slide('equations-auto', {
    id: 'eq-premier-degre',
    kicker: 'Équations · 1',
    title: 'Équation du premier degré',
    formula: ['ax + b = 0', `x = − ${f('b', 'a')}  (a ≠ 0)`],
    line: 'On isole x : d’abord les constantes, puis le coefficient.',
  });

  K.slide('equations-auto', {
    id: 'eq-inequation',
    kicker: 'Équations · 2',
    title: 'Inéquation : attention au signe',
    formula: ['ax + b ≤ 0', 'a > 0 : x ≤ − b/a', 'a < 0 : x ≥ − b/a'],
    line: 'Multiplier ou diviser par un nombre négatif retourne l’inégalité.',
    size: 'lg',
  });

  K.slide('equations-auto', {
    id: 'eq-systeme',
    kicker: 'Équations · 3',
    title: 'Système de deux équations',
    formula: ['2x + y = 5', 'x − y = 1', '⟺  x = 2, y = 1'],
    line: 'Par substitution : exprimer y avec la seconde, puis remplacer dans la première.',
    size: 'lg',
  });

  /* ---------------- Valeur absolue ---------------- */

  K.slide('valeur-absolue', {
    id: 'va-distance',
    kicker: 'Valeur absolue · 1',
    title: 'Une valeur absolue est une distance',
    formula: ['|x − a| = distance entre x et a', '|x| = distance entre x et 0'],
    line: 'Sur la droite réelle, |x − a| compte les unités qui séparent x de a.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -5, xmax: 5, ymin: 0, ymax: 1.6 },
        params: [
          { key: 'a', label: 'centre a', min: -4, max: 4, step: 1, value: 1, decimals: 0 },
          { key: 'r', label: 'rayon r', min: 0, max: 3, step: 0.1, value: 1 },
        ],
        draw(p) {
          const a = p.state.a;
          const radius = p.state.r;
          const y = 0.8;
          p.line(p.bounds.xmin, y, p.bounds.xmax, y, {
            color: 'rgba(246, 241, 232, 0.22)',
            width: 2,
          });
          p.line(a - radius, y, a + radius, y, { color: C.ACCENT, width: 7 });
          p.dot(a - radius, y, { color: C.ACCENT, r: 5 });
          p.dot(a + radius, y, { color: C.ACCENT, r: 5 });
          p.dot(a, y, { color: C.BLUE, r: 5, label: 'a', dy: -20 });
          p.text(a, 0.28, 'a − r ≤ x ≤ a + r', { align: 'center', color: C.MUTED });
        },
      });
    },
  });

  K.slide('valeur-absolue', {
    id: 'va-equations',
    kicker: 'Valeur absolue · 2',
    title: 'Résoudre avec une valeur absolue',
    formula: ['|x − a| = r  ⟺  x = a − r  ou  x = a + r', '|x − a| ≤ r  ⟺  a − r ≤ x ≤ a + r'],
    line: 'On traduit toujours en distance avant de calculer.',
    size: 'lg',
  });

  /* ---------------- Dérivées usuelles ---------------- */

  K.slide('derivees-auto', {
    id: 'der-usuelles',
    kicker: 'Dérivées · 1',
    title: 'Les dérivées à connaître',
    size: 'lg',
    main: K.table(
      ['f(x)', 'f′(x)'],
      [
        ['x<sup>n</sup>', 'n x<sup>n−1</sup>'],
        [f('1', 'x'), `− ${f('1', 'x²')}`],
        [r('x'), f('1', `2${r('x')}`)],
        ['e<sup>x</sup>', 'e<sup>x</sup>'],
        ['ln x', f('1', 'x')],
        ['sin x', 'cos x'],
        ['cos x', '− sin x'],
      ],
    ),
    line: 'Elles se lisent dans les deux sens, y compris pour les primitives.',
  });

  K.slide('derivees-auto', {
    id: 'der-operations',
    kicker: 'Dérivées · 2',
    title: 'Dériver une somme, un produit, un quotient',
    size: 'lg',
    formula: [
      '(u + v)′ = u′ + v′',
      '(uv)′ = u′v + uv′',
      `(${f('u', 'v')})′ = ${f('u′v − uv′', 'v²')}`,
    ],
    line: 'La dérivée d’un produit n’est pas le produit des dérivées.',
  });

  K.slide('derivees-auto', {
    id: 'der-composee',
    kicker: 'Dérivées · 3',
    title: 'La règle de composition',
    formula: ['(u ∘ v)′(x) = v′(x) × u′(v(x))', '(e<sup>u</sup>)′ = u′ e<sup>u</sup>'],
    line: 'On dérive l’extérieur, puis on multiplie par la dérivée de l’intérieur.',
  });
})();
