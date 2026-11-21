// Terminale spécialité — programme en vigueur en 2026-2027.
// Same layout rules: one notion, large formulas, one line, interactive figure.
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;

  /* ==================== Suites : limites et récurrence ==================== */

  K.slide('suites-limites', {
    id: 'sl-convergence',
    kicker: 'Suites · 1',
    title: 'Converger, c’est se rapprocher d’une limite',
    formula: ['u<sub>n</sub> → ℓ', '|u<sub>n</sub> − ℓ| devient aussi petit que voulu'],
    line: 'À partir d’un certain rang, tous les termes restent dans un intervalle autour de ℓ.',
    size: 'lg',
  });

  K.slide('suites-limites', {
    id: 'sl-geometrique',
    kicker: 'Suites · 2',
    title: 'Le cas géométrique',
    formula: ['u<sub>n</sub> = q<sup>n</sup>', '|q| < 1  ⟹  q<sup>n</sup> → 0', 'q > 1  ⟹  q<sup>n</sup> → +∞'],
    line: 'Tout dépend de la position de q par rapport à −1, 0 et 1.',
    size: 'lg',
  });

  K.slide('suites-limites', {
    id: 'sl-comparaison',
    kicker: 'Suites · 3',
    title: 'Comparer pour conclure',
    formula: ['u<sub>n</sub> ≤ v<sub>n</sub> ≤ w<sub>n</sub>', 'u<sub>n</sub> → ℓ et w<sub>n</sub> → ℓ  ⟹  v<sub>n</sub> → ℓ'],
    line: 'Théorème des gendarmes : encadrer une suite par deux suites de même limite.',
    size: 'lg',
  });

  K.slide('suites-limites', {
    id: 'sl-recurrence',
    kicker: 'Suites · 4',
    title: 'Le raisonnement par récurrence',
    formula: ['initialisation : P(n₀) vraie', 'hérédité : P(n) ⟹ P(n + 1)', 'conclusion : P(n) vraie pour tout n ≥ n₀'],
    line: 'Les deux étapes sont indispensables : l’une sans l’autre ne prouve rien.',
    size: 'lg',
  });

  K.slide('suites-limites', {
    id: 'sl-monotone-bornee',
    kicker: 'Suites · 5',
    title: 'Monotone et bornée',
    formula: ['(u<sub>n</sub>) croissante et majorée  ⟹  elle converge'],
    line: 'C’est le théorème de convergence monotone : pas besoin de connaître la limite.',
  });

  /* ==================== Limites de fonctions ==================== */

  K.slide('limites-fonctions', {
    id: 'lf-asymptotes',
    kicker: 'Limites · 1',
    title: 'Les limites se lisent sur la courbe',
    formula: ['lim<sub>x→+∞</sub> f(x) = ℓ  ⟹  asymptote y = ℓ', 'lim<sub>x→a</sub> |f(x)| = +∞  ⟹  asymptote x = a'],
    line: 'Une asymptote est une droite dont la courbe se rapproche indéfiniment.',
    size: 'lg',
  });

  K.slide('limites-fonctions', {
    id: 'lf-indeterminees',
    kicker: 'Limites · 2',
    title: 'Les formes indéterminées',
    formula: ['∞ − ∞', '0 × ∞', f('∞', '∞'), f('0', '0')],
    line: 'On factorise par le terme dominant, ou on multiplie par la quantité conjuguée.',
  });

  K.slide('limites-fonctions', {
    id: 'lf-croissances',
    kicker: 'Limites · 3',
    title: 'Croissances comparées',
    formula: ['lim<sub>x→+∞</sub> ' + f('e<sup>x</sup>', 'x') + ' = +∞', 'lim<sub>x→+∞</sub> ' + f('ln x', 'x') + ' = 0'],
    line: 'L’exponentielle gagne contre toute puissance, le logarithme perd contre elle.',
    size: 'lg',
  });

  K.slide('limites-fonctions', {
    id: 'lf-figure',
    kicker: 'Limites · 4',
    title: 'Asymptote horizontale',
    formula: ['f(x) = ' + f('a x', 'x + 1')],
    line: 'Quand x devient grand, f(x) se rapproche de a sans jamais l’atteindre.',
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

  /* ==================== Continuité et TVI ==================== */

  K.slide('continuite', {
    id: 'ct-continuite',
    kicker: 'Continuité · 1',
    title: 'Une courbe sans rupture',
    formula: ['lim<sub>x→a</sub> f(x) = f(a)'],
    line: 'Sur un intervalle, on peut tracer la courbe sans lever le crayon.',
  });

  K.slide('continuite', {
    id: 'ct-tvi',
    kicker: 'Continuité · 2',
    title: 'Théorème des valeurs intermédiaires',
    formula: ['f continue sur [a ; b]', 'k entre f(a) et f(b)  ⟹  il existe c ∈ [a ; b] avec f(c) = k'],
    line: 'Si f est de plus strictement monotone, ce c est unique.',
    size: 'lg',
  });

  K.slide('continuite', {
    id: 'ct-dichotomie',
    kicker: 'Continuité · 3',
    title: 'Dichotomie : encadrer une solution',
    formula: ['on coupe [a ; b] en deux', 'on garde l’intervalle où f change de signe'],
    line: 'À chaque étape l’encadrement est divisé par 2.',
  });

  K.slide('continuite', {
    id: 'ct-figure',
    kicker: 'Continuité · 4',
    title: 'Compter les solutions',
    formula: ['f(x) = k  ⟺  f(x) − k = 0'],
    line: 'Chaque croisement de la droite horizontale est une solution.',
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
          let previous = -3 * -3 * -3 + 9 + 1 - s.k;
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

  /* ==================== Dérivation et convexité ==================== */

  K.slide('derivation-convexite', {
    id: 'dc-derivee-seconde',
    kicker: 'Convexité · 1',
    title: 'La dérivée seconde',
    formula: ['f″ = (f′)′'],
    line: 'Elle décrit la façon dont la pente évolue.',
  });

  K.slide('derivation-convexite', {
    id: 'dc-convexite',
    kicker: 'Convexité · 2',
    title: 'Convexe ou concave',
    formula: ['f″ ≥ 0  ⟹  f convexe (tangentes sous la courbe)', 'f″ ≤ 0  ⟹  f concave'],
    line: 'Convexe : la courbe tourne sa concavité vers le haut.',
    size: 'lg',
  });

  K.slide('derivation-convexite', {
    id: 'dc-inflexion',
    kicker: 'Convexité · 3',
    title: 'Point d’inflexion',
    formula: ['f″ s’annule et change de signe en a'],
    line: 'La courbe traverse sa tangente : la convexité change de côté.',
  });

  K.slide('derivation-convexite', {
    id: 'dc-figure',
    kicker: 'Convexité · 4',
    title: 'Deux inflexions possibles',
    formula: ['f(x) = ' + f('x⁴', '4') + ' − ' + f('a x²', '2')],
    line: 'Selon a, la courbe est partout convexe ou possède deux points d’inflexion.',
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

  /* ==================== Logarithme népérien ==================== */

  K.slide('logarithme', {
    id: 'log-definition',
    kicker: 'Logarithme · 1',
    title: 'Le logarithme népérien',
    formula: ['ln x  défini pour x > 0', 'ln(e<sup>x</sup>) = x', 'e<sup>ln x</sup> = x'],
    line: 'C’est la fonction réciproque de l’exponentielle.',
    size: 'lg',
  });

  K.slide('logarithme', {
    id: 'log-proprietes',
    kicker: 'Logarithme · 2',
    title: 'Les propriétés algébriques',
    formula: ['ln(ab) = ln a + ln b', 'ln(a/b) = ln a − ln b', 'ln(a<sup>n</sup>) = n ln a'],
    line: 'Le logarithme transforme les produits en sommes.',
    size: 'lg',
  });

  K.slide('logarithme', {
    id: 'log-derivee',
    kicker: 'Logarithme · 3',
    title: 'Dériver un logarithme',
    formula: ['(ln x)′ = ' + f('1', 'x'), '(ln u)′ = ' + f('u′', 'u')],
    line: 'Valable seulement là où u > 0.',
    size: 'lg',
  });

  K.slide('logarithme', {
    id: 'log-limites',
    kicker: 'Logarithme · 4',
    title: 'Aux bornes du domaine',
    formula: ['lim<sub>x→0⁺</sub> ln x = −∞', 'lim<sub>x→+∞</sub> ln x = +∞'],
    line: 'ln 1 = 0 : la courbe coupe l’axe des abscisses en 1.',
    size: 'lg',
  });

  K.slide('logarithme', {
    id: 'log-figure',
    kicker: 'Logarithme · 5',
    title: 'La tangente en a',
    formula: ['y = ln a + ' + f('1', 'a') + '(x − a)'],
    line: 'Plus a est grand, plus la pente 1/a est faible.',
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

  /* ==================== Fonctions exponentielles ==================== */

  K.slide('exponentielle-complements', {
    id: 'ec-croissances',
    kicker: 'Exponentielle · 1',
    title: 'Qui gagne à l’infini ?',
    formula: ['lim<sub>x→+∞</sub> ' + f('e<sup>x</sup>', 'x<sup>n</sup>') + ' = +∞', 'lim<sub>x→+∞</sub> x<sup>n</sup> e<sup>−x</sup> = 0'],
    line: 'L’exponentielle domine toute puissance de x.',
    size: 'lg',
  });

  K.slide('exponentielle-complements', {
    id: 'ec-derivees',
    kicker: 'Exponentielle · 2',
    title: 'Dérivées et composées',
    formula: ['(e<sup>u</sup>)′ = u′ e<sup>u</sup>', '(e<sup>−x</sup>)′ = − e<sup>−x</sup>'],
    line: 'La dérivée de l’exposant sort devant l’exponentielle.',
  });

  K.slide('exponentielle-complements', {
    id: 'ec-equations',
    kicker: 'Exponentielle · 3',
    title: 'Résoudre avec des exponentielles',
    formula: ['e<sup>x</sup> = a  ⟺  x = ln a  (a > 0)', 'e<sup>u</sup> = e<sup>v</sup>  ⟺  u = v'],
    line: 'On isole l’exponentielle, puis on applique le logarithme.',
    size: 'lg',
  });

  K.slide('exponentielle-complements', {
    id: 'ec-figure',
    kicker: 'Exponentielle · 4',
    title: 'x e<sup>−x</sup> : un maximum',
    formula: ['f(x) = x e<sup>−x</sup>', 'f′(x) = (1 − x) e<sup>−x</sup>'],
    line: 'Maximum en x = 1 : l’exponentielle finit par écraser la croissance linéaire.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 7, ymin: -0.5, ymax: 0.6 },
        params: [],
        draw(p) {
          p.plot((x) => x * Math.exp(-x), { color: C.ACCENT });
          p.dot(1, Math.exp(-1), { color: C.BLUE, r: 5, label: 'max' });
          p.hline(0, { color: 'rgba(246, 241, 232, 0.2)', width: 1 });
        },
      });
    },
  });

  /* ==================== Trigonométrie : compléments ==================== */

  K.slide('trigo-complements', {
    id: 'tc-derivees',
    kicker: 'Trigonométrie · 1',
    title: 'Dériver sinus et cosinus',
    formula: ['(sin x)′ = cos x', '(cos x)′ = − sin x', '(sin u)′ = u′ cos u'],
    line: 'Un signe moins apparaît pour le cosinus.',
    size: 'lg',
  });

  K.slide('trigo-complements', {
    id: 'tc-addition',
    kicker: 'Trigonométrie · 2',
    title: 'Formules d’addition',
    formula: ['cos(a + b) = cos a cos b − sin a sin b', 'sin(a + b) = sin a cos b + cos a sin b'],
    line: 'Elles permettent de linéariser ou de calculer des valeurs exactes.',
    size: 'lg',
  });

  K.slide('trigo-complements', {
    id: 'tc-duplication',
    kicker: 'Trigonométrie · 3',
    title: 'Formules de duplication',
    formula: ['cos 2a = cos² a − sin² a', 'sin 2a = 2 sin a cos a'],
    line: 'Cas particulier b = a des formules d’addition.',
    size: 'lg',
  });

  K.slide('trigo-complements', {
    id: 'tc-equations',
    kicker: 'Trigonométrie · 4',
    title: 'Équations trigonométriques',
    formula: ['cos x = cos α  ⟺  x = ± α + 2kπ', 'sin x = sin α  ⟺  x = α + 2kπ  ou  π − α + 2kπ'],
    line: 'On s’aide du cercle trigonométrique pour ne rien oublier.',
    size: 'lg',
  });

  K.slide('trigo-complements', {
    id: 'tc-figure',
    kicker: 'Trigonométrie · 5',
    title: 'La tangente à la sinusoïde',
    formula: ['(sin x)′ = cos x'],
    line: 'En 0, la pente vaut 1 : sin x ≈ x au voisinage de 0.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -7, xmax: 7, ymin: -2, ymax: 2 },
        params: [{ key: 'a', label: 'point a', min: -6, max: 6, step: 0.1, value: 0 }],
        draw(p) {
          p.plot((x) => Math.sin(x), { color: C.ACCENT });
          p.tangent((x) => Math.sin(x), p.state.a, { color: C.BLUE, half: 1.4 });
        },
        readout(s) {
          return `pente = cos a = ${M.com(Math.cos(s.a))}`;
        },
      });
    },
  });

  /* ==================== Primitives ==================== */

  K.slide('primitives', {
    id: 'pr-definition',
    kicker: 'Primitives · 1',
    title: 'Une primitive, c’est l’inverse de la dérivée',
    formula: ['F′ = f sur I', 'F + k est aussi une primitive'],
    line: 'Deux primitives d’une même fonction diffèrent d’une constante.',
    size: 'lg',
  });

  K.slide('primitives', {
    id: 'pr-tableau',
    kicker: 'Primitives · 2',
    title: 'Les primitives usuelles',
    size: 'lg',
    main: K.table(
      ['f(x)', 'F(x)'],
      [
        ['x<sup>n</sup>', f('x<sup>n+1</sup>', 'n + 1') + ' + k'],
        [f('1', 'x'), 'ln |x| + k'],
        ['e<sup>x</sup>', 'e<sup>x</sup> + k'],
        ['cos x', 'sin x + k'],
        ['sin x', '− cos x + k'],
      ],
    ),
    line: 'On vérifie toujours en dérivant F.',
  });

  K.slide('primitives', {
    id: 'pr-composees',
    kicker: 'Primitives · 3',
    title: 'Reconnaître une forme composée',
    formula: ['u′ u<sup>n</sup> → ' + f('u<sup>n+1</sup>', 'n + 1'), f('u′', 'u') + ' → ln |u|', 'u′ e<sup>u</sup> → e<sup>u</sup>'],
    line: 'On cherche u et u′ dans l’expression avant de conclure.',
    size: 'lg',
  });

  K.slide('primitives', {
    id: 'pr-exemple',
    kicker: 'Primitives · 4',
    title: 'Un exemple guidé',
    formula: ['f(x) = 2x e<sup>x²</sup>', 'F(x) = e<sup>x²</sup> + k'],
    line: 'Ici u = x² et u′ = 2x : la forme u′e<sup>u</sup> est immédiate.',
    size: 'lg',
  });

  /* ==================== Calcul intégral ==================== */

  K.slide('integrale', {
    id: 'int-definition',
    kicker: 'Intégrale · 1',
    title: 'L’intégrale, une aire signée',
    formula: ['∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)'],
    line: 'Une primitive suffit : on évalue entre les bornes.',
  });

  K.slide('integrale', {
    id: 'int-aire',
    kicker: 'Intégrale · 2',
    title: 'Aire sous la courbe',
    formula: ['∫<sub>a</sub><sup>b</sup> f(x) dx > 0  si f ≥ 0'],
    line: 'Sous l’axe, l’intégrale compte négativement : c’est une aire algébrique.',
  });

  K.slide('integrale', {
    id: 'int-valeur-moyenne',
    kicker: 'Intégrale · 3',
    title: 'Valeur moyenne',
    formula: ['m = ' + f('1', 'b − a') + ' ∫<sub>a</sub><sup>b</sup> f(x) dx'],
    line: 'C’est la hauteur du rectangle de même aire que le domaine sous la courbe.',
  });

  K.slide('integrale', {
    id: 'int-figure',
    kicker: 'Intégrale · 4',
    title: 'Faire varier les bornes',
    formula: ['f(x) = ' + f('x²', '2') + ' + 1'],
    line: 'L’aire colorée vaut F(b) − F(a).',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -0.5, xmax: 4.5, ymin: -1, ymax: 8 },
        params: [
          { key: 'a', label: 'borne a', min: 0, max: 2.5, step: 0.1, value: 0.5 },
          { key: 'b', label: 'borne b', min: 0.5, max: 4, step: 0.1, value: 3 },
        ],
        draw(p) {
          const { a, b } = p.state;
          const fn = (x) => (x * x) / 2 + 1;
          const lo = Math.min(a, b);
          const hi = Math.max(a, b);
          p.area(fn, lo, hi, { color: 'rgba(227, 199, 158, 0.22)' });
          p.plot(fn);
          p.vline(lo, { color: 'rgba(246, 241, 232, 0.3)', dash: [4, 4] });
          p.vline(hi, { color: 'rgba(246, 241, 232, 0.3)', dash: [4, 4] });
        },
        readout(s) {
          const F = (x) => (x * x * x) / 6 + x;
          const lo = Math.min(s.a, s.b);
          const hi = Math.max(s.a, s.b);
          return `∫ = F(b) − F(a) = ${M.com(F(hi) - F(lo))}`;
        },
      });
    },
  });

  K.slide('integrale', {
    id: 'int-proprietes',
    kicker: 'Intégrale · 5',
    title: 'Linéarité et Chasles',
    formula: ['∫(αf + βg) = α∫f + β∫g', '∫<sub>a</sub><sup>b</sup> = ∫<sub>a</sub><sup>c</sup> + ∫<sub>c</sub><sup>b</sup>'],
    line: 'On découpe un intervalle, ou on combine deux intégrales connues.',
    size: 'lg',
  });

  /* ==================== Équations différentielles ==================== */

  K.slide('equations-differentielles', {
    id: 'ed-ya',
    kicker: 'Équations différentielles · 1',
    title: 'y′ = ay',
    formula: ['y(x) = C e<sup>ax</sup>'],
    line: 'La constante C se détermine avec une condition initiale.',
    size: 'lg',
  });

  K.slide('equations-differentielles', {
    id: 'ed-ayb',
    kicker: 'Équations différentielles · 2',
    title: 'y′ = ay + b',
    formula: ['y(x) = C e<sup>ax</sup> − ' + f('b', 'a')],
    line: 'On ajoute la solution constante −b/a, puis on ajuste avec C.',
    size: 'lg',
  });

  K.slide('equations-differentielles', {
    id: 'ed-condition',
    kicker: 'Équations différentielles · 3',
    title: 'Avec une condition initiale',
    formula: ['y(0) = y₀  ⟹  C = y₀ + ' + f('b', 'a')],
    line: 'Une seule condition suffit pour une équation du premier ordre.',
  });

  K.slide('equations-differentielles', {
    id: 'ed-modele',
    kicker: 'Équations différentielles · 4',
    title: 'Modéliser une évolution',
    formula: ['y′ = a y  (a > 0)', 'y′ = − k y  (décroissance)'],
    line: 'Croissance ou décroissance exponentielle selon le signe du coefficient.',
    size: 'lg',
  });

  K.slide('equations-differentielles', {
    id: 'ed-figure',
    kicker: 'Équations différentielles · 5',
    title: 'Une famille de solutions',
    formula: ['y = C e<sup>ax</sup>'],
    line: 'Toutes les solutions se déduisent les unes des autres par homothétie.',
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
  });

  /* ==================== Combinatoire et dénombrement ==================== */

  K.slide('combinatoire', {
    id: 'co-principe',
    kicker: 'Combinatoire · 1',
    title: 'Le principe multiplicatif',
    formula: ['n₁ × n₂ × … × n<sub>k</sub>'],
    line: 'Si un choix se fait en étapes indépendantes, on multiplie les possibilités.',
  });

  K.slide('combinatoire', {
    id: 'co-factorielle',
    kicker: 'Combinatoire · 2',
    title: 'La factorielle',
    formula: ['n! = 1 × 2 × … × n', '0! = 1'],
    line: 'Elle compte les ordres possibles de n objets distincts.',
  });

  K.slide('combinatoire', {
    id: 'co-arrangements',
    kicker: 'Combinatoire · 3',
    title: 'Arrangements et permutations',
    formula: ['A<sub>n</sub><sup>k</sup> = ' + f('n!', '(n − k)!')],
    line: 'On choisit k objets parmi n, dans un ordre précis.',
  });

  K.slide('combinatoire', {
    id: 'co-combinaisons',
    kicker: 'Combinatoire · 4',
    title: 'Combinaisons',
    formula: ['C<sub>n</sub><sup>k</sup> = ' + f('n!', 'k!(n − k)!'), 'C<sub>n</sub><sup>k</sup> = C<sub>n</sub><sup>n−k</sup>'],
    line: 'Cette fois l’ordre ne compte pas : c’est un sous-ensemble.',
    size: 'lg',
  });

  K.slide('combinatoire', {
    id: 'co-binome',
    kicker: 'Combinatoire · 5',
    title: 'Formule du binôme',
    formula: ['(a + b)<sup>n</sup> = Σ C<sub>n</sub><sup>k</sup> a<sup>k</sup> b<sup>n−k</sup>'],
    line: 'Les coefficients se lisent dans le triangle de Pascal.',
  });

  /* ==================== Probabilités et loi binomiale ==================== */

  K.slide('loi-binomiale', {
    id: 'lb-bernoulli',
    kicker: 'Loi binomiale · 1',
    title: 'Une épreuve de Bernoulli',
    formula: ['succès : probabilité p', 'échec : probabilité 1 − p'],
    line: 'Deux issues seulement, et une probabilité constante à chaque répétition.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-schema',
    kicker: 'Loi binomiale · 2',
    title: 'Le schéma de Bernoulli',
    formula: ['n épreuves identiques et indépendantes'],
    line: 'X compte le nombre de succès : c’est une variable binomiale.',
    size: 'lg',
  });

  K.slide('loi-binomiale', {
    id: 'lb-loi',
    kicker: 'Loi binomiale · 3',
    title: 'La loi binomiale',
    formula: ['P(X = k) = C<sub>n</sub><sup>k</sup> p<sup>k</sup> (1 − p)<sup>n−k</sup>'],
    line: 'On choisit les k succès, on pondère par leur probabilité.',
  });

  K.slide('loi-binomiale', {
    id: 'lb-esperance',
    kicker: 'Loi binomiale · 4',
    title: 'Espérance et variance',
    formula: ['E(X) = np', 'V(X) = np(1 − p)', 'σ(X) = √(np(1 − p))'],
    line: 'L’espérance est le nombre moyen de succès sur n répétitions.',
    size: 'lg',
  });

  K.slide('loi-binomiale', {
    id: 'lb-figure',
    kicker: 'Loi binomiale · 5',
    title: 'La forme de la loi',
    formula: ['X ~ B(n ; p)'],
    line: 'Plus n est grand, plus la distribution se resserre autour de np.',
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

  /* ==================== Vecteurs, droites et plans de l’espace ==================== */

  K.slide('espace-vecteurs', {
    id: 'ev-coplanaires',
    kicker: 'Espace · 1',
    title: 'Vecteurs coplanaires',
    formula: ['w = a u + b v'],
    line: 'Trois vecteurs sont coplanaires si l’un s’écrit comme combinaison des deux autres.',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-droite-plan',
    kicker: 'Espace · 2',
    title: 'Droites et plans',
    formula: ['droite : un point + un vecteur directeur', 'plan : un point + deux vecteurs non colinéaires'],
    line: 'Dans l’espace, deux vecteurs suffisent à décrire une direction de plan.',
    size: 'lg',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-positions',
    kicker: 'Espace · 3',
    title: 'Positions relatives',
    formula: ['droites : sécantes, parallèles ou non coplanaires', 'droite et plan : sécants ou parallèles'],
    line: 'Deux droites non coplanaires ne se coupent jamais et ne sont pas parallèles.',
    size: 'lg',
  });

  K.slide('espace-vecteurs', {
    id: 'ev-figure',
    kicker: 'Espace · 4',
    title: 'Voir un cube en perspective',
    formula: ['(O ; i, j, k)'],
    line: 'Les arêtes donnent les trois directions de l’espace.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 3.5, ymin: -1, ymax: 3.5 },
        params: [],
        draw(p) {
          const proj = (x, y, z) => [x + 0.45 * z, y + 0.3 * z];
          const cube = (x, y, z) => proj(x, y, z);
          const corners = [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
            [0, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 1, 1],
          ];
          const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
          ];
          edges.forEach(([i, j]) => {
            const A = cube(...corners[i]);
            const B = cube(...corners[j]);
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

  /* ==================== Orthogonalité et distances ==================== */

  K.slide('espace-orthogonalite', {
    id: 'eo-produit-scalaire',
    kicker: 'Orthogonalité · 1',
    title: 'Produit scalaire dans l’espace',
    formula: ['u · v = xx′ + yy′ + zz′', 'u ⊥ v  ⟺  u · v = 0'],
    line: 'Les formules du plan s’étendent avec une troisième coordonnée.',
    size: 'lg',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-droite-plan',
    kicker: 'Orthogonalité · 2',
    title: 'Droite orthogonale à un plan',
    formula: ['d ⊥ P  ⟺  vecteur directeur de d colinéaire au normal de P'],
    line: 'Une droite est orthogonale à un plan dès qu’elle est orthogonale à deux droites sécantes du plan.',
    size: 'lg',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-distance',
    kicker: 'Orthogonalité · 3',
    title: 'Distance d’un point à un plan',
    formula: ['d = ' + f('|ax₀ + by₀ + cz₀ + d|', '√(a² + b² + c²)')],
    line: 'On projette le point sur le plan le long de la normale.',
  });

  K.slide('espace-orthogonalite', {
    id: 'eo-distance-point',
    kicker: 'Orthogonalité · 4',
    title: 'Distance d’un point à une droite',
    formula: ['d(M, d) = MH  avec  H le projeté orthogonal de M'],
    line: 'H est le point de la droite le plus proche de M.',
  });

  /* ==================== Repérage dans l’espace ==================== */

  K.slide('espace-reperage', {
    id: 'er-parametrique',
    kicker: 'Repérage · 1',
    title: 'Représentation paramétrique d’une droite',
    formula: ['x = x₀ + t a', 'y = y₀ + t b', 'z = z₀ + t c'],
    line: 'Le point (x₀ ; y₀ ; z₀) et le vecteur (a ; b ; c) déterminent la droite.',
    size: 'lg',
  });

  K.slide('espace-reperage', {
    id: 'er-plan',
    kicker: 'Repérage · 2',
    title: 'Équation cartésienne d’un plan',
    formula: ['ax + by + cz + d = 0', 'normal n(a ; b ; c)'],
    line: 'Le vecteur normal donne l’orientation du plan.',
    size: 'lg',
  });

  K.slide('espace-reperage', {
    id: 'er-intersection',
    kicker: 'Repérage · 3',
    title: 'Intersection droite–plan',
    formula: ['on remplace x, y, z par la paramétrique dans l’équation du plan'],
    line: 'On obtient une équation en t : aucune, une ou une infinité de solutions.',
  });

  K.slide('espace-reperage', {
    id: 'er-figure',
    kicker: 'Repérage · 4',
    title: 'Un plan et sa normale',
    formula: ['P : 2x + y + z − 3 = 0', 'n(2 ; 1 ; 1)'],
    line: 'La normale est perpendiculaire à toutes les directions du plan.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 4, ymin: -1, ymax: 4 },
        params: [],
        draw(p) {
          // Plane 2x + y + z = 3, drawn in a simple oblique projection.
          const proj = (x, y, z) => [x + 0.45 * z, y + 0.3 * z];
          const planePoint = (x, y) => [x, y, 3 - 2 * x - y];
          const corners = [
            [0, 0],
            [1.4, 0],
            [1.4, 1.4],
            [0, 1.4],
          ].map(([x, y]) => proj(...planePoint(x, y)));
          p.ctx.save();
          p.ctx.beginPath();
          corners.forEach(([x, y], i) => (i ? p.ctx.lineTo(x, y) : p.ctx.moveTo(x, y)));
          p.ctx.closePath();
          p.ctx.fillStyle = 'rgba(180, 168, 240, 0.16)';
          p.ctx.fill();
          p.ctx.strokeStyle = C.VIOLET;
          p.ctx.lineWidth = 1.8;
          p.ctx.stroke();
          p.ctx.restore();
          const M0 = proj(0.5, 0.5, 3 - 1 - 0.5);
          const N = proj(0.5 + 0.8, 0.5 + 0.4, 2 + 0.4);
          p.line(M0[0], M0[1], N[0], N[1], { color: C.BLUE, width: 2.4 });
          p.dot(N[0], N[1], { color: C.BLUE, r: 4.5, label: 'n' });
        },
      });
    },
  });
})();
