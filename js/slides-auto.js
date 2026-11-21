// Chapter "Automatismes": one idea and its formulas per slide, in very large type.
(function () {
  'use strict';

  const M = window.M;
  const slides = (window.MATHS_SLIDES = window.MATHS_SLIDES || []);

  const f = (num, den) => M.frac(num, den);
  const R2 = M.sqrt('2');
  const R3 = M.sqrt('3');

  // Base slides belong to three Automatismes chapters.
  const CHAPTERS = {
    'auto-fractions': 'fractions',
    'auto-addition': 'fractions',
    'auto-soustraction': 'fractions',
    'auto-multiplication': 'fractions',
    'auto-division': 'fractions',
    'auto-puissances': 'puissances',
    'auto-racines': 'puissances',
    'auto-pourcentages': 'pourcentages',
  };

  // Every slide is: kicker, title, formulas, one short line of words.
  function addSlide(id, position, title, formulas, say) {
    slides.push({
      id,
      chapter: CHAPTERS[id] || 'fractions',
      title,
      build(el) {
        el.innerHTML =
          M.head(`Automatismes · ${position}`, title, '') +
          `<div class="big-forms">${formulas.map((html) => `<div class="formula xl">${html}</div>`).join('')}</div>` +
          (say ? `<p class="say">${say}</p>` : '');
      },
    });
  }

  addSlide(
    'auto-fractions',
    1,
    'Fractions',
    [`${f('a', 'b')} = a ÷ b`, `${f('a × k', 'b × k')} = ${f('a', 'b')}`],
    'Multiplier en haut et en bas par le même nombre ne change rien.',
  );

  addSlide(
    'auto-addition',
    2,
    'Additionner',
    [`${f('a', 'd')} + ${f('b', 'd')} = ${f('a + b', 'd')}`, `${f('a', 'b')} + ${f('c', 'd')} = ${f('a d + c b', 'b d')}`],
    'Même dénominateur d’abord.',
  );

  addSlide(
    'auto-soustraction',
    3,
    'Soustraire',
    [`${f('a', 'd')} − ${f('b', 'd')} = ${f('a − b', 'd')}`, `${f('a', 'b')} − ${f('c', 'd')} = ${f('a d − c b', 'b d')}`],
    'Même dénominateur d’abord, puis on soustrait les numérateurs.',
  );

  addSlide(
    'auto-multiplication',
    4,
    'Multiplier',
    [`${f('a', 'b')} × ${f('c', 'd')} = ${f('a × c', 'b × d')}`],
    'Numérateurs entre eux, dénominateurs entre eux.',
  );

  addSlide(
    'auto-division',
    5,
    'Diviser',
    [`${f('a', 'b')} ÷ ${f('c', 'd')} = ${f('a', 'b')} × ${f('d', 'c')} = ${f('a × d', 'b × c')}`],
    'Diviser par une fraction, c’est multiplier par son inverse.',
  );

  addSlide(
    'auto-puissances',
    6,
    'Puissances',
    [
      `(${f('a', 'b')})<sup>n</sup> = ${f('aⁿ', 'bⁿ')}`,
      `(${f('a', 'b')})<sup>−n</sup> = (${f('b', 'a')})<sup>n</sup>`,
      `(${f('a', 'b')})<sup>${f('p', 'q')}</sup> = ${M.sqrt(`(${f('a', 'b')})<sup>p</sup>`)}`,
    ],
    'L’exposant s’applique au numérateur et au dénominateur.',
  );

  addSlide(
    'auto-racines',
    7,
    'Racines',
    [
      `${R2} × ${R3} = ${M.sqrt('a × b')} = ${M.sqrt('6')}`,
      `${M.sqrt('a² × b')} = a ${M.sqrt('b')}`,
      `${f('1', R2)} = ${f(R2, '2')}`,
    ],
    'Un facteur carré sort de la racine ; un dénominateur irrationnel se rend entier.',
  );

  addSlide(
    'auto-pourcentages',
    8,
    'Pourcentages',
    [
      `t % de P = P × ${f('t', '100')}`,
      `+ t % = × ${f('100 + t', '100')}`,
      `− t % = × ${f('100 − t', '100')}`,
    ],
    'Un pourcentage est toujours une multiplication.',
  );
})();
