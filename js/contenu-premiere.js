// Première spécialité — programme 2026 (BO n° 14 du 2 avril 2026).
// One notion per slide: a title, the formulas very large, at most one line,
// and an interactive figure when the notion has a graph.
(function () {
  'use strict';

  const M = window.M;
  const K = window.Kit;
  const G = window.G;
  const f = M.frac;
  const r = M.sqrt;
  const C = G.colors;

  /* ==================== Second degré ==================== */

  K.slide('second-degre', {
    id: 'sd-canonique',
    kicker: 'Second degré · 1',
    title: 'La forme canonique',
    formula: [`f(x) = a(x − α)² + β`, `α = − ${f('b', '2a')}`, 'β = f(α)'],
    line: 'Toute parabole se lit à partir de son sommet S(α ; β).',
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
    id: 'sd-discriminant',
    kicker: 'Second degré · 2',
    title: 'Le discriminant décide',
    formula: ['Δ = b² − 4ac', `x₁ = ${f('−b − √Δ', '2a')}`, `x₂ = ${f('−b + √Δ', '2a')}`],
    line: 'Deux racines si Δ > 0, une seule si Δ = 0, aucune réelle si Δ < 0.',
    size: 'lg',
  });

  K.slide('second-degre', {
    id: 'sd-signe',
    kicker: 'Second degré · 3',
    title: 'Le signe du trinôme',
    formula: ['f(x) = a(x − x₁)(x − x₂)', 'f est du signe de a, sauf entre les racines'],
    line: 'À l’extérieur des racines, la parabole est du côté de a ; entre, du côté opposé.',
    main: K.table(
      ['x', '−∞', 'x₁', 'x₂', '+∞'],
      [
        ['f(x), a > 0', '+', '0', '−', '0', '+'],
        ['f(x), a < 0', '−', '0', '+', '0', '−'],
      ],
    ),
  });

  K.slide('second-degre', {
    id: 'sd-somme-produit',
    kicker: 'Second degré · 4',
    title: 'Somme et produit des racines',
    formula: [`x₁ + x₂ = − ${f('b', 'a')}`, `x₁ x₂ = ${f('c', 'a')}`],
    line: 'Pratique pour vérifier des racines ou reconstruire l’équation.',
  });

  K.slide('second-degre', {
    id: 'sd-exemple',
    kicker: 'Second degré · 5',
    title: 'Un exemple complet',
    formula: ['2x² − 5x + 2 = 0', 'Δ = 25 − 16 = 9', `x₁ = ${f('1', '2')} , x₂ = 2`],
    line: 'Puis 2x² − 5x + 2 = 2(x − 1/2)(x − 2).',
    size: 'lg',
  });

  K.slide('second-degre', {
    id: 'sd-variations',
    kicker: 'Second degré · 6',
    title: 'Le sommet donne les variations',
    formula: ['a > 0 : décroissante puis croissante', 'a < 0 : croissante puis décroissante'],
    line: 'Le minimum (ou maximum) vaut β, atteint en x = α.',
    size: 'lg',
  });

  /* ==================== Polynômes de degré 3 ==================== */

  K.slide('polynomes-degre-3', {
    id: 'p3-racine',
    kicker: 'Polynômes de degré 3 · 1',
    title: 'Une racine évidente débloque tout',
    formula: ['P(a) = 0  ⟹  P(x) = (x − a) Q(x)', 'deg Q = deg P − 1'],
    line: 'On teste 0, ±1, ±2… puis on identifie les coefficients de Q.',
  });

  K.slide('polynomes-degre-3', {
    id: 'p3-exemple',
    kicker: 'Polynômes de degré 3 · 2',
    title: 'Factoriser par identification',
    formula: ['P(x) = x³ − 2x² − 5x + 6', 'P(1) = 0', 'P(x) = (x − 1)(x² − x − 6)'],
    line: 'Puis x² − x − 6 = (x − 3)(x + 2) : les racines sont −2, 1 et 3.',
    size: 'lg',
  });

  K.slide('polynomes-degre-3', {
    id: 'p3-signe',
    kicker: 'Polynômes de degré 3 · 3',
    title: 'Le signe d’un produit de facteurs',
    formula: ['P(x) = (x − a)(x − b)(x − c)'],
    line: 'Chaque facteur change de signe en sa racine : le signe alterne si les racines sont simples.',
  });

  K.slide('polynomes-degre-3', {
    id: 'p3-figure',
    kicker: 'Polynômes de degré 3 · 4',
    title: 'Trois racines, deux bosses',
    formula: ['P(x) = (x − a)(x − 1)(x + 2)'],
    line: 'La courbe coupe l’axe des abscisses une fois par racine simple.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -4, xmax: 5, ymin: -8, ymax: 8 },
        params: [{ key: 'a', label: 'racine a', min: -1.5, max: 4, step: 0.1, value: 3 }],
        draw(p) {
          const a = p.state.a;
          const fn = (x) => (x - a) * (x - 1) * (x + 2);
          p.plot(fn);
          [-2, 1, a].forEach((root) => p.dot(root, 0, { color: C.BLUE, r: 4.5 }));
        },
        readout(s) {
          return `racines : −2 · 1 · ${M.com(s.a, 1)}`;
        },
      });
    },
  });

  /* ==================== Suites : généralités ==================== */

  K.slide('suites', {
    id: 'suites-definition',
    kicker: 'Suites · 1',
    title: 'Une suite est une fonction de ℕ',
    formula: ['u : ℕ → ℝ,  n ↦ u<sub>n</sub>', 'u<sub>n+1</sub> = f(u<sub>n</sub>)'],
    line: 'Formule explicite en n, ou relation de récurrence d’un terme au suivant.',
    size: 'lg',
  });

  K.slide('suites', {
    id: 'suites-representation',
    kicker: 'Suites · 2',
    title: 'Représenter une suite',
    formula: ['points (n ; u<sub>n</sub>)'],
    line: 'On place des points isolés, jamais une courbe continue.',
  });

  K.slide('suites', {
    id: 'suites-variations',
    kicker: 'Suites · 3',
    title: 'Sens de variation',
    formula: ['u<sub>n+1</sub> − u<sub>n</sub> > 0  ⟹  (u<sub>n</sub>) croissante', 'u<sub>n+1</sub> − u<sub>n</sub> < 0  ⟹  décroissante'],
    line: 'On étudie le signe de la différence, pour tout n.',
    size: 'lg',
  });

  K.slide('suites', {
    id: 'suites-recurrence-figure',
    kicker: 'Suites · 4',
    title: 'Voir une suite récurrente',
    formula: ['u<sub>n+1</sub> = a u<sub>n</sub> + 1'],
    line: 'Chaque point se déduit du précédent : la suite peut croître, décroître ou osciller.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 12, ymin: -1, ymax: 10 },
        params: [
          { key: 'u0', label: 'u₀', min: 0, max: 5, step: 0.5, value: 1, decimals: 1 },
          { key: 'a', label: 'a', min: -1.5, max: 1.5, step: 0.1, value: 0.6 },
        ],
        draw(p) {
          let u = p.state.u0;
          const a = p.state.a;
          const pts = [];
          for (let n = 0; n <= 12; n += 1) {
            pts.push([n, u]);
            u = a * u + 1;
          }
          G.dots(p, pts, { stems: true, color: C.ACCENT });
        },
        readout(s) {
          const a = s.a;
          if (Math.abs(a) >= 1) return `|a| ≥ 1 : pas de limite finie (sauf cas particulier)`;
          return `point fixe : ${M.com(1 / (1 - a))}`;
        },
      });
    },
  });

  K.slide('suites', {
    id: 'suites-limite-intuitive',
    kicker: 'Suites · 5',
    title: 'Vers quoi tend une suite ?',
    formula: ['u<sub>n</sub> → ℓ  quand  n → +∞'],
    line: 'Si u<sub>n+1</sub> = 0,6 u<sub>n</sub> + 1, la suite se stabilise vers 2,5.',
  });

  /* ==================== Suites arithmétiques et géométriques ==================== */

  K.slide('suites-ag', {
    id: 'sag-arithmetique',
    kicker: 'Suites arithmétiques · 1',
    title: 'Arithmétique : on ajoute toujours r',
    formula: ['u<sub>n</sub> = u<sub>0</sub> + n r', 'u<sub>n</sub> = u<sub>p</sub> + (n − p) r'],
    line: 'Croissante si r > 0, décroissante si r < 0, constante si r = 0.',
    size: 'lg',
  });

  K.slide('suites-ag', {
    id: 'sag-somme-arithmetique',
    kicker: 'Suites arithmétiques · 2',
    title: 'Somme des termes',
    formula: ['1 + 2 + … + n = ' + f('n(n + 1)', '2'), 'S = ' + f('(n + 1)(u₀ + u<sub>n</sub>)', '2')],
    line: 'On additionne les extrêmes, puis on multiplie par le nombre de termes.',
    size: 'lg',
  });

  K.slide('suites-ag', {
    id: 'sag-geometrique',
    kicker: 'Suites géométriques · 3',
    title: 'Géométrique : on multiplie toujours q',
    formula: ['u<sub>n</sub> = u<sub>0</sub> q<sup>n</sup>', 'u<sub>n</sub> = u<sub>p</sub> q<sup>n−p</sup>'],
    line: 'Croissante si q > 1 (termes positifs), décroissante si 0 < q < 1, alternée si q < 0.',
    size: 'lg',
  });

  K.slide('suites-ag', {
    id: 'sag-somme-geometrique',
    kicker: 'Suites géométriques · 4',
    title: 'Somme géométrique',
    formula: ['1 + q + … + q<sup>n</sup> = ' + f('1 − q<sup>n+1</sup>', '1 − q') + '  (q ≠ 1)'],
    line: 'On factorise par u₀ pour la somme des termes d’une suite géométrique.',
  });

  K.slide('suites-ag', {
    id: 'sag-figure',
    kicker: 'Suites géométriques · 5',
    title: 'Voir la raison q',
    formula: ['u<sub>n</sub> = u<sub>0</sub> q<sup>n</sup>'],
    line: 'Une raison proche de 1 donne une évolution lente ; q > 1 explose.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: -1, xmax: 12, ymin: -2, ymax: 12 },
        params: [
          { key: 'u0', label: 'u₀', min: 0.5, max: 4, step: 0.5, value: 1, decimals: 1 },
          { key: 'q', label: 'raison q', min: -1.2, max: 1.6, step: 0.05, value: 0.7 },
        ],
        draw(p) {
          const pts = [];
          for (let n = 0; n <= 11; n += 1) {
            pts.push([n, p.state.u0 * Math.pow(p.state.q, n)]);
          }
          G.dots(p, pts, { stems: true, color: C.SIN });
        },
      });
    },
  });

  /* ==================== Dérivation ==================== */

  K.slide('derivation', {
    id: 'der-taux',
    kicker: 'Dérivation · 1',
    title: 'Le nombre dérivé, une limite de pente',
    formula: [`f′(a) = lim<sub>h→0</sub> ${f('f(a + h) − f(a)', 'h')}`],
    line: 'C’est la pente de la tangente en a, limite des pentes des sécantes.',
  });

  K.slide('derivation', {
    id: 'der-tangente',
    kicker: 'Dérivation · 2',
    title: 'L’équation de la tangente',
    formula: ['y = f(a) + f′(a)(x − a)'],
    line: 'Un point et une pente suffisent : c’est l’approximation affine locale.',
  });

  K.slide('derivation', {
    id: 'der-usuelles',
    kicker: 'Dérivation · 3',
    title: 'Dérivées des fonctions usuelles',
    size: 'lg',
    main: K.table(
      ['f(x)', 'f′(x)'],
      [
        ['x<sup>n</sup>', 'n x<sup>n−1</sup>'],
        [f('1', 'x'), `− ${f('1', 'x²')}`],
        [r('x'), f('1', `2${r('x')}`)],
        ['e<sup>x</sup>', 'e<sup>x</sup>'],
      ],
    ),
    line: 'À connaître dans les deux sens, pour dériver comme pour primitiver.',
  });

  K.slide('derivation', {
    id: 'der-operations',
    kicker: 'Dérivation · 4',
    title: 'Opérations sur les dérivées',
    size: 'lg',
    formula: ['(u + v)′ = u′ + v′', '(uv)′ = u′v + uv′', `(${f('u', 'v')})′ = ${f('u′v − uv′', 'v²')}`],
    line: 'Et pour une composée : (u ∘ v)′ = v′ × u′(v).',
  });

  K.slide('derivation', {
    id: 'der-secante-figure',
    kicker: 'Dérivation · 5',
    title: 'De la sécante à la tangente',
    formula: [`pente = ${f('f(a + h) − f(a)', 'h')}`],
    line: 'Faire tendre h vers 0 fait glisser la sécante vers la tangente.',
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

  /* ==================== Étude des fonctions ==================== */

  K.slide('etude-fonctions', {
    id: 'ef-signe-derivee',
    kicker: 'Étude des fonctions · 1',
    title: 'Le signe de f′ donne les variations',
    formula: ['f′ > 0 sur I  ⟹  f croissante sur I', 'f′ < 0 sur I  ⟹  f décroissante sur I'],
    line: 'C’est le lien central entre calcul et forme de la courbe.',
    size: 'lg',
  });

  K.slide('etude-fonctions', {
    id: 'ef-extremum',
    kicker: 'Étude des fonctions · 2',
    title: 'Un extremum est un changement de signe',
    formula: ['f′(a) = 0  et  f′ change de signe en a'],
    line: '+ puis − : maximum local ; − puis + : minimum local.',
  });

  K.slide('etude-fonctions', {
    id: 'ef-tableau',
    kicker: 'Étude des fonctions · 3',
    title: 'Le tableau de variations',
    formula: ['f(x) = x³ − 3x', 'f′(x) = 3x² − 3 = 3(x − 1)(x + 1)'],
    main: K.table(
      ['x', '−∞', '−1', '1', '+∞'],
      [
        ['f′(x)', '+', '0', '−', '0', '+'],
        ['f(x)', '↗', '2', '↘', '−2', '↗'],
      ],
    ),
    line: 'Maximum local 2 en −1, minimum local −2 en 1.',
    size: 'lg',
  });

  K.slide('etude-fonctions', {
    id: 'ef-figure',
    kicker: 'Étude des fonctions · 4',
    title: 'Voir les extremums',
    formula: ['f(x) = x³ − 3ax'],
    line: 'Le paramètre a déplace les deux bosses et leurs extrema.',
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
    title: 'La fonction qui est sa propre dérivée',
    formula: ['f′ = f  et  f(0) = 1', 'f(x) = e<sup>x</sup>', 'e ≈ 2,718'],
    line: 'Une seule fonction vérifie ces deux conditions : l’exponentielle.',
    size: 'lg',
  });

  K.slide('exponentielle', {
    id: 'exp-proprietes',
    kicker: 'Exponentielle · 2',
    title: 'Les propriétés algébriques',
    formula: ['e<sup>a+b</sup> = e<sup>a</sup> e<sup>b</sup>', 'e<sup>−a</sup> = ' + f('1', 'e<sup>a</sup>'), '(e<sup>a</sup>)<sup>n</sup> = e<sup>na</sup>'],
    line: 'L’exponentielle transforme les sommes en produits.',
    size: 'lg',
  });

  K.slide('exponentielle', {
    id: 'exp-derivee',
    kicker: 'Exponentielle · 3',
    title: 'Dériver une exponentielle',
    formula: ['(e<sup>x</sup>)′ = e<sup>x</sup>', '(e<sup>u</sup>)′ = u′ e<sup>u</sup>'],
    line: 'La dérivée de l’intérieur sort en facteur.',
  });

  K.slide('exponentielle', {
    id: 'exp-signe',
    kicker: 'Exponentielle · 4',
    title: 'Toujours strictement positive',
    formula: ['e<sup>x</sup> > 0', 'e<sup>x</sup> = e<sup>y</sup>  ⟺  x = y'],
    line: 'La fonction est strictement croissante sur ℝ : elle ne s’annule jamais.',
    size: 'lg',
  });

  K.slide('exponentielle', {
    id: 'exp-figure',
    kicker: 'Exponentielle · 5',
    title: 'La tangente en 0',
    formula: ['(e<sup>kx</sup>)′ = k e<sup>kx</sup>'],
    line: 'En 0, la pente vaut k : c’est le taux de croissance initial.',
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

  /* ==================== Produit scalaire ==================== */

  K.slide('produit-scalaire', {
    id: 'ps-definition',
    kicker: 'Produit scalaire · 1',
    title: 'Un produit qui mesure les angles',
    formula: ['u · v = ‖u‖ ‖v‖ cos θ', 'u ⊥ v  ⟺  u · v = 0'],
    line: 'Le produit scalaire est nul exactement quand les vecteurs sont orthogonaux.',
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
          const proj = (3 * vx) / 3;
          p.line(vx, vy, proj, 0, { color: C.BLUE, dash: [4, 4] });
          p.dot(proj, 0, { color: C.BLUE, r: 4 });
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
    formula: ['u(x ; y) · v(x′ ; y′) = xx′ + yy′'],
    line: 'À utiliser dès qu’un repère orthonormé est donné.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-normes',
    kicker: 'Produit scalaire · 3',
    title: 'Normes et produit scalaire',
    formula: ['‖u + v‖² = ‖u‖² + 2 u·v + ‖v‖²', 'u·v = ' + f('1', '2') + '(‖u + v‖² − ‖u‖² − ‖v‖²)'],
    line: 'Le produit scalaire se retrouve à partir des longueurs.',
    size: 'lg',
  });

  K.slide('produit-scalaire', {
    id: 'ps-alkashi',
    kicker: 'Produit scalaire · 4',
    title: 'Théorème d’Al-Kashi',
    formula: ['a² = b² + c² − 2bc cos Â'],
    line: 'La généralisation de Pythagore aux triangles quelconques.',
  });

  K.slide('produit-scalaire', {
    id: 'ps-orthogonalite',
    kicker: 'Produit scalaire · 5',
    title: 'Prouver un angle droit',
    formula: ['AB · AC = 0  ⟺  (AB) ⊥ (AC)'],
    line: 'On calcule le produit scalaire des deux vecteurs, puis on conclut.',
  });

  /* ==================== Géométrie repérée ==================== */

  K.slide('geometrie-reperee', {
    id: 'gr-vecteurs',
    kicker: 'Géométrie repérée · 1',
    title: 'Colinéarité en coordonnées',
    formula: ['u(x ; y), v(x′ ; y′)', 'u et v colinéaires  ⟺  xy′ − x′y = 0'],
    line: 'Ce déterminant nul signifie que les vecteurs ont la même direction.',
    size: 'lg',
  });

  K.slide('geometrie-reperee', {
    id: 'gr-droite',
    kicker: 'Géométrie repérée · 2',
    title: 'Équation cartésienne d’une droite',
    formula: ['ax + by + c = 0', 'vecteur directeur (−b ; a)', 'vecteur normal (a ; b)'],
    line: 'Le vecteur normal est perpendiculaire à la droite : pratique pour les distances.',
    size: 'lg',
  });

  K.slide('geometrie-reperee', {
    id: 'gr-cercle',
    kicker: 'Géométrie repérée · 3',
    title: 'Équation d’un cercle',
    formula: ['(x − a)² + (y − b)² = r²'],
    line: 'Centre Ω(a ; b), rayon r : c’est Pythagore appliqué à chaque point.',
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

  K.slide('geometrie-reperee', {
    id: 'gr-intersection',
    kicker: 'Géométrie repérée · 4',
    title: 'Intersection droite–cercle',
    formula: ['droite : y = mx + p', 'cercle : (x − a)² + (y − b)² = r²'],
    line: 'On substitue y dans l’équation du cercle : le nombre de solutions est le nombre de points.',
  });

  /* ==================== Probabilités conditionnelles ==================== */

  K.slide('probabilites-conditionnelles', {
    id: 'pc-definition',
    kicker: 'Probabilités conditionnelles · 1',
    title: 'Conditionner, c’est restreindre l’univers',
    formula: ['P<sub>A</sub>(B) = ' + f('P(A ∩ B)', 'P(A)'), 'P(A ∩ B) = P(A) × P<sub>A</sub>(B)'],
    line: 'On divise par la probabilité de la condition : l’univers devient A.',
    size: 'lg',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-arbre',
    kicker: 'Probabilités conditionnelles · 2',
    title: 'L’arbre pondéré',
    formula: ['produit le long d’une branche', 'somme des chemins disjoints'],
    line: 'Chaque nœud se pondère avec la probabilité conditionnelle de l’étape.',
    size: 'lg',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-totales',
    kicker: 'Probabilités conditionnelles · 3',
    title: 'Formule des probabilités totales',
    formula: ['P(B) = P(A) P<sub>A</sub>(B) + P(Ā) P<sub>Ā</sub>(B)'],
    line: 'On découpe selon une partition : les chemins qui mènent à B.',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-independance',
    kicker: 'Probabilités conditionnelles · 4',
    title: 'Indépendance',
    formula: ['P(A ∩ B) = P(A) P(B)', '⟺  P<sub>A</sub>(B) = P(B)'],
    line: 'Savoir que A est réalisé ne change rien à la probabilité de B.',
    size: 'lg',
  });

  K.slide('probabilites-conditionnelles', {
    id: 'pc-tableau',
    kicker: 'Probabilités conditionnelles · 5',
    title: 'Lire un tableau de contingence',
    size: 'lg',
    main: K.table(
      ['', 'B', 'B̄', 'Total'],
      [
        ['A', '0,12', '0,28', '0,40'],
        ['Ā', '0,18', '0,42', '0,60'],
        ['Total', '0,30', '0,70', '1'],
      ],
    ),
    line: 'P<sub>A</sub>(B) = 0,12 / 0,40 = 0,3 : on lit dans la ligne de A.',
  });

  /* ==================== Variables aléatoires ==================== */

  K.slide('variables-aleatoires', {
    id: 'va-loi',
    kicker: 'Variables aléatoires · 1',
    title: 'La loi de probabilité',
    formula: ['P(X = x<sub>i</sub>) = p<sub>i</sub>', 'p₁ + p₂ + … + p<sub>n</sub> = 1'],
    line: 'Elle donne la probabilité de chaque valeur prise par X.',
    size: 'lg',
  });

  K.slide('variables-aleatoires', {
    id: 'va-esperance',
    kicker: 'Variables aléatoires · 2',
    title: 'Espérance : la moyenne attendue',
    formula: ['E(X) = Σ x<sub>i</sub> p<sub>i</sub>'],
    line: 'C’est la valeur moyenne sur un grand nombre d’expériences.',
  });

  K.slide('variables-aleatoires', {
    id: 'va-variance',
    kicker: 'Variables aléatoires · 3',
    title: 'Variance et écart type',
    formula: ['V(X) = Σ p<sub>i</sub> (x<sub>i</sub> − E(X))²', 'σ(X) = √V(X)'],
    line: 'L’écart type mesure la dispersion autour de l’espérance, dans l’unité de X.',
    size: 'lg',
  });

  K.slide('variables-aleatoires', {
    id: 'va-lineaire',
    kicker: 'Variables aléatoires · 4',
    title: 'Décaler et multiplier',
    formula: ['E(aX + b) = a E(X) + b', 'V(aX + b) = a² V(X)'],
    line: 'Un décalage ne change pas la dispersion ; un facteur la multiplie au carré.',
    size: 'lg',
  });

  K.slide('variables-aleatoires', {
    id: 'va-figure',
    kicker: 'Variables aléatoires · 5',
    title: 'Loi uniforme sur {1 ; … ; n}',
    formula: ['E(X) = ' + f('n + 1', '2'), 'V(X) = ' + f('n² − 1', '12')],
    line: 'Chaque valeur a la même probabilité 1/n.',
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

  /* ==================== Échantillonnage ==================== */

  K.slide('echantillonnage', {
    id: 'ech-fluctuation',
    kicker: 'Échantillonnage · 1',
    title: 'Intervalle de fluctuation',
    formula: ['I = [p − ' + f('1', '√n') + ' ; p + ' + f('1', '√n') + ']'],
    line: 'Dans au moins 95 % des échantillons de taille n, la fréquence tombe dans I.',
    size: 'lg',
  });

  K.slide('echantillonnage', {
    id: 'ech-decision',
    kicker: 'Échantillonnage · 2',
    title: 'Prendre une décision',
    formula: ['f ∉ I  ⟹  on rejette l’hypothèse p'],
    line: 'Si la fréquence observée est trop loin de p, l’hypothèse devient invraisemblable.',
  });

  K.slide('echantillonnage', {
    id: 'ech-confiance',
    kicker: 'Échantillonnage · 3',
    title: 'Intervalle de confiance',
    formula: ['IC = [f − ' + f('1', '√n') + ' ; f + ' + f('1', '√n') + ']'],
    line: 'La proportion p est dans cet intervalle avec une confiance d’au moins 95 %.',
    size: 'lg',
  });

  K.slide('echantillonnage', {
    id: 'ech-figure',
    kicker: 'Échantillonnage · 4',
    title: 'Voir la largeur de l’intervalle',
    formula: ['largeur = ' + f('2', '√n')],
    line: 'Plus n est grand, plus l’intervalle est étroit : la précision augmente.',
    plot(canvas, panel) {
      return G.frame(canvas, panel, {
        view: { xmin: 0, xmax: 1, ymin: 0, ymax: 1 },
        params: [
          { key: 'p', label: 'proportion p', min: 0.1, max: 0.9, step: 0.02, value: 0.5 },
          { key: 'n', label: 'taille n', min: 25, max: 400, step: 25, value: 100, decimals: 0 },
        ],
        draw(p) {
          const { p: prop, n } = p.state;
          const half = 1 / Math.sqrt(n);
          const y = 0.55;
          p.line(0, y, 1, y, { color: 'rgba(246, 241, 232, 0.25)', width: 2 });
          p.line(prop - half, y, prop + half, y, { color: C.ACCENT, width: 8 });
          p.dot(prop, y, { color: C.BLUE, r: 5.5, label: 'p', dy: -18 });
          p.text(prop, 0.2, `± ${M.com(half, 3)}`, { align: 'center', size: 12 });
        },
        readout(s) {
          return `largeur = ${M.com(2 / Math.sqrt(s.n), 3)}`;
        },
      });
    },
  });

  /* ==================== Algorithmique et Python ==================== */

  K.slide('algorithmique', {
    id: 'algo-boucle-for',
    kicker: 'Algorithmique · 1',
    title: 'Boucler un nombre connu de fois',
    formula: ['somme des entiers de 1 à n'],
    main:
      '<pre class="code"><span class="kw">def</span> <span class="fn">somme</span>(n):\n' +
      '    s = <span class="num">0</span>\n' +
      '    <span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, n + <span class="num">1</span>):\n' +
      '        s = s + k\n' +
      '    <span class="kw">return</span> s</pre>',
    line: 'range(1, n + 1) parcourt 1, 2, …, n.',
    size: 'lg',
  });

  K.slide('algorithmique', {
    id: 'algo-while',
    kicker: 'Algorithmique · 2',
    title: 'Boucler jusqu’à un seuil',
    main:
      '<pre class="code"><span class="kw">def</span> <span class="fn">premier_n</span>(seuil):\n' +
      '    n = <span class="num">0</span>\n' +
      '    <span class="kw">while</span> n * n &lt; seuil:\n' +
      '        n = n + <span class="num">1</span>\n' +
      '    <span class="kw">return</span> n</pre>',
    line: 'La boucle while s’arrête dès que la condition devient fausse.',
    size: 'lg',
  });

  K.slide('algorithmique', {
    id: 'algo-fonction',
    kicker: 'Algorithmique · 3',
    title: 'Une fonction qui calcule uₙ',
    main:
      '<pre class="code"><span class="kw">def</span> <span class="fn">terme</span>(n):\n' +
      '    u = <span class="num">1</span>\n' +
      '    <span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(n):\n' +
      '        u = <span class="num">0.5</span> * u + <span class="num">3</span>\n' +
      '    <span class="kw">return</span> u</pre>',
    formula: ['u<sub>n+1</sub> = 0,5 u<sub>n</sub> + 3'],
    line: 'Une boucle de n tours calcule uₙ à partir de u₀.',
    size: 'lg',
  });

  K.slide('algorithmique', {
    id: 'algo-simulation',
    kicker: 'Algorithmique · 4',
    title: 'Simuler pour estimer une probabilité',
    main:
      '<pre class="code"><span class="kw">from</span> random <span class="kw">import</span> randint\n\n' +
      '<span class="kw">def</span> <span class="fn">frequence</span>(n):\n' +
      '    gagnants = <span class="num">0</span>\n' +
      '    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n):\n' +
      '        <span class="kw">if</span> randint(<span class="num">1</span>, <span class="num">6</span>) == <span class="num">6</span>:\n' +
      '            gagnants = gagnants + <span class="num">1</span>\n' +
      '    <span class="kw">return</span> gagnants / n</pre>',
    line: 'La fréquence observée se rapproche de la probabilité quand n augmente.',
  });
})();
