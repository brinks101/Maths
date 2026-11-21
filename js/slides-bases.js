// Chapter "Bases": mental maths reflexes and a 60 s trainer.
(function () {
  'use strict';

  const M = window.M;
  const slides = (window.MATHS_SLIDES = window.MATHS_SLIDES || []);

  /* ------------------------------------------------------------------ */
  /* 0. Title                                                            */
  /* ------------------------------------------------------------------ */

  slides.push({
    id: 'titre',
    chapter: 'intro',
    title: 'Les maths en manipulant',
    build(el) {
      el.innerHTML = `
        <div class="hero">
          <p class="kicker">Cours interactif · 1re spé</p>
          <h1>Comprendre les maths<br><em>d'un regard.</em></h1>
          <p class="lead">Automatismes de calcul, puis trigonométrie. Une diapo, une idée,
            écrite en très grand.</p>
          <div class="cards4">
            <button class="chapter-card" type="button" data-go="auto-fractions">
              <span class="chip-label">Partie 1</span>
              <strong>Automatismes</strong>
              <span>Fractions, puissances, racines, pourcentages.</span>
            </button>
            <button class="chapter-card" type="button" data-go="trigo-triangle">
              <span class="chip-label">Partie 2</span>
              <strong>Trigonométrie</strong>
              <span>Triangle, cercle, tangente, valeurs remarquables, angles associés, équations.</span>
            </button>
          </div>
          <p class="hero-note"><kbd>←</kbd> <kbd>→</kbd> naviguer · <kbd>M</kbd> sommaire ·
            <kbd>F</kbd> plein écran · <kbd>N</kbd> page de notes.</p>
        </div>`;
      el.querySelectorAll('[data-go]').forEach((button) => {
        button.addEventListener('click', () => window.Deck.go(button.dataset.go));
      });
    },
  });

  /* ------------------------------------------------------------------ */
  /* 1. Three reflexes                                                   */
  /* ------------------------------------------------------------------ */

  function mathRow(op, body) {
    return `<div class="mathline"><span class="op">${op}</span><span class="eq-bar">=</span><span>${body}</span></div>`;
  }

  slides.push({
    id: 'bases-pourquoi',
    chapter: 'bases',
    title: 'Trois réflexes qui font 90 % du calcul',
    build(el) {
      el.innerHTML =
        M.head(
          'Bases · 1',
          'Trois réflexes qui font 90 % du calcul',
          'Le calcul mental, ce n\u2019est pas une mémoire prodigieuse : c\u2019est de la décomposition. On transforme un calcul pénible en deux calculs faciles.',
        ) +
        `<div class="grid2">
          <div class="stack">
            <div class="card">
              <h3 class="card-title">1. Passer par ×10</h3>
              <p class="muted">Multiplier par 9, 11, 99, 5 : on glisse par 10, puis on corrige.</p>
              <div class="formula">47 × 9 = 47 × 10 − 47 = 423</div>
            </div>
            <div class="card">
              <h3 class="card-title">2. S\u2019ancrer sur 10 ou 100</h3>
              <p class="muted">Compléter jusqu\u2019au nombre rond, puis ajouter le reste.</p>
              <div class="formula">58 + 37 = 60 + 35 = 95</div>
            </div>
            <div class="card">
              <h3 class="card-title">3. Arrondir, puis corriger</h3>
              <p class="muted">Un facteur proche d\u2019un nombre rond est un cadeau : on prend le cadeau, on rend la monnaie.</p>
              <div class="formula">198 × 4 = 200 × 4 − 2 × 4 = 792</div>
            </div>
          </div>
          <div class="card">
            <h3 class="card-title">La machine à décomposer</h3>
            <p class="muted">Choisis un nombre et regarde les quatre réflexes travailler pour toi.</p>
            <div id="machine-host"></div>
            <div class="mathlines" id="machine-lines"></div>
            <p class="note">Tu n\u2019as pas à retenir quatre formules : tu as à retenir <em>« je passe par 10 »</em>.</p>
          </div>
        </div>`;

      const host = el.querySelector('#machine-host');
      const lines = el.querySelector('#machine-lines');

      function render(n) {
        lines.innerHTML = [
          mathRow(`${n} × 9`, `${n * 10} − ${n} = <strong>${M.com(n * 9)}</strong>`),
          mathRow(`${n} × 11`, `${n * 10} + ${n} = <strong>${M.com(n * 11)}</strong>`),
          mathRow(`${n} × 5`, `${n * 10} ÷ 2 = <strong>${M.com(n * 5)}</strong>`),
          mathRow(`${n} × 99`, `${n * 100} − ${n} = <strong>${M.com(n * 99)}</strong>`),
        ].join('');
      }

      M.slider(host, { label: 'n', min: 12, max: 99, value: 47, onInput: render });
      render(47);
    },
  });

  /* ------------------------------------------------------------------ */
  /* 2. Complements to 100                                               */
  /* ------------------------------------------------------------------ */

  slides.push({
    id: 'bases-complements',
    chapter: 'bases',
    title: 'Compléter à 100',
    build(el) {
      el.innerHTML =
        M.head(
          'Bases · 2',
          'Compléter à 100',
          'Trouver ce qui manque pour atteindre 100. C\u2019est le réflexe qui rend les soustractions et les pourcentages instantanés.',
        ) +
        `<div class="grid2">
          <div class="stack">
            <div class="card">
              <h3 class="card-title">La règle des chiffres</h3>
              <p class="muted">Pour un nombre à deux chiffres : les dizaines montent à 9, les unités montent à 10.</p>
              <div class="bar" id="bar">
                <span class="bar-a" id="bar-a"></span>
                <span class="bar-b" id="bar-b"></span>
              </div>
              <p class="big" id="comp"></p>
              <div class="formula" id="trick"></div>
            </div>
            <div id="n-host"></div>
          </div>
          <div class="card">
            <h3 class="card-title">À toi : complète à 100</h3>
            <p class="question small" id="drill-q">…</p>
            <div class="answer-row">
              <input id="drill-in" inputmode="numeric" autocomplete="off" placeholder="?" aria-label="Complément">
              <button class="btn primary" id="drill-ok" type="button">Vérifier</button>
            </div>
            <div class="feedback" id="drill-fb"></div>
            <div class="drill-meta">
              <span id="drill-score">0 réussite</span>
              <button class="btn ghost small" id="drill-next" type="button">Autre nombre</button>
            </div>
            <p class="note">Ici, pas de chrono : on cherche la régularité, la vitesse viendra seule.</p>
          </div>
        </div>`;

      const comp = el.querySelector('#comp');
      const trick = el.querySelector('#trick');
      const barA = el.querySelector('#bar-a');
      const barB = el.querySelector('#bar-b');

      function renderComp(n) {
        const c = 100 - n;
        comp.innerHTML = `100 − ${n} = <strong>${c}</strong>`;
        barA.style.width = `${n}%`;
        barB.style.width = `${c}%`;
        barA.textContent = n >= 10 ? String(n) : '';
        barB.textContent = c >= 10 ? String(c) : '';
        if (n >= 10 && n <= 99) {
          const tens = Math.floor(n / 10);
          const units = n % 10;
          if (units === 0) {
            trick.innerHTML = `Astuce : 9 − ${tens} + 1 = ${10 - tens} dizaines, 0 unité → <strong>${(10 - tens) * 10}</strong>`;
          } else {
            trick.innerHTML =
              `Astuce : 9 − ${tens} = ${9 - tens} (dizaines) et 10 − ${units} = ${10 - units} (unités) ` +
              `→ <strong>${9 - tens}${10 - units}</strong>`;
          }
        } else if (n === 100) {
          trick.textContent = '100 − 100 = 0.';
        } else {
          trick.textContent = 'Pour les petits nombres, il reste à compter jusqu\u2019à 100.';
        }
      }

      M.slider(el.querySelector('#n-host'), {
        label: 'n',
        min: 0,
        max: 100,
        value: 47,
        onInput: renderComp,
      });
      renderComp(47);

      let target = M.randInt(11, 89);
      let score = 0;
      let pending = 0;
      const questionEl = el.querySelector('#drill-q');
      const input = el.querySelector('#drill-in');
      const feedback = el.querySelector('#drill-fb');
      const scoreEl = el.querySelector('#drill-score');

      function ask() {
        target = M.randInt(11, 89);
        questionEl.textContent = `100 − ${target} = ?`;
        input.value = '';
        feedback.textContent = '';
        feedback.className = 'feedback';
        input.focus();
      }

      function check() {
        const value = M.num(input.value);
        if (!Number.isFinite(value)) {
          feedback.className = 'feedback';
          feedback.textContent = 'Tape un nombre.';
          return;
        }
        if (Math.abs(value - (100 - target)) < 1e-9) {
          score += 1;
          scoreEl.textContent = `${score} réussite${score > 1 ? 's' : ''}`;
          feedback.className = 'feedback ok';
          feedback.textContent = `Exact : 100 − ${target} = ${100 - target}.`;
          clearTimeout(pending);
          pending = setTimeout(ask, 700);
        } else {
          feedback.className = 'feedback bad';
          feedback.textContent = `Non : il manque ${100 - target}.`;
        }
      }

      el.querySelector('#drill-ok').addEventListener('click', check);
      el.querySelector('#drill-next').addEventListener('click', ask);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') check();
      });
      ask();

      return () => clearTimeout(pending);
    },
  });

  /* ------------------------------------------------------------------ */
  /* 3. Squares                                                          */
  /* ------------------------------------------------------------------ */

  slides.push({
    id: 'bases-carres',
    chapter: 'bases',
    title: 'Carrés : trois raccourcis',
    build(el) {
      el.innerHTML =
        M.head(
          'Bases · 3',
          'Carrés : trois raccourcis',
          'Un carré, c\u2019est une identité remarquable : (a + b)² = a² + 2ab + b². On choisit a pour que le calcul soit facile.',
        ) +
        `<div class="grid2">
          <div class="card">
            <h3 class="card-title">Choisis n</h3>
            <div id="carre-host"></div>
            <p class="big" id="carre-result"></p>
            <p class="muted small">On coupe autour de la dizaine : n = base ± d, donc
              n² = base² ± 2 × base × d + d².</p>
            <div class="formula">(a + b)² = a² + 2ab + b²</div>
          </div>
          <div class="stack" id="carre-cards"></div>
        </div>`;

      const cards = el.querySelector('#carre-cards');
      const result = el.querySelector('#carre-result');

      function render(n) {
        const square = n * n;
        result.innerHTML = `${n}² = <strong>${M.com(square)}</strong>`;
        const blocks = [];

        if (n % 10 === 0) {
          const tens = n / 10;
          blocks.push(`
            <div class="card">
              <h4>Multiple de 10</h4>
              <div class="formula">${n}² = ${tens}² × 100 = ${M.com(tens * tens)} × 100 = <strong>${M.com(square)}</strong></div>
            </div>`);
        } else {
          const base = M.clamp(Math.round(n / 10) * 10, 10, 100);
          const d = n - base;
          const absD = Math.abs(d);
          const sign = d < 0 ? '−' : '+';
          blocks.push(`
            <div class="card">
              <h4>Autour de la dizaine</h4>
              <div class="formula">
                ${n}² = ${base}² ${sign} 2 × ${base} × ${absD} + ${absD}²<br>
                = ${M.com(base * base)} ${sign} ${M.com(2 * base * absD)} + ${M.com(absD * absD)}
                = <strong>${M.com(square)}</strong>
              </div>
            </div>`);
        }

        if (n % 10 === 5) {
          const tens = Math.floor(n / 10);
          blocks.push(`
            <div class="card">
              <h4>Nombre en …5</h4>
              <p class="muted small">On multiplie le chiffre des dizaines par le suivant, puis on colle 25.</p>
              <div class="formula">${n}² → ${tens} × ${tens + 1} = ${M.com(tens * (tens + 1))}, puis 25 → <strong>${M.com(square)}</strong></div>
            </div>`);
        }

        if (n >= 85) {
          const k = 100 - n;
          blocks.push(`
            <div class="card">
              <h4>Proche de 100</h4>
              <div class="formula">${n}² = (100 − ${k})² = 10 000 − ${M.com(200 * k)} + ${M.com(k * k)} = <strong>${M.com(square)}</strong></div>
            </div>`);
        }

        cards.innerHTML = blocks.join('');
      }

      M.slider(el.querySelector('#carre-host'), { label: 'n', min: 10, max: 99, value: 47, onInput: render });
      render(47);
    },
  });

  /* ------------------------------------------------------------------ */
  /* 4. 60 seconds trainer                                               */
  /* ------------------------------------------------------------------ */

  const generators = [
    () => {
      const a = M.randInt(3, 12);
      const b = M.randInt(3, 12);
      return { q: `${a} × ${b}`, a: a * b };
    },
    () => {
      const a = M.randInt(12, 19);
      const b = M.randInt(2, 9);
      return { q: `${a} × ${b}`, a: a * b };
    },
    () => {
      const n = M.randInt(13, 89);
      return { q: `100 − ${n}`, a: 100 - n };
    },
    () => {
      const n = M.randInt(12, 89);
      return { q: `${n} × 11`, a: n * 11 };
    },
    () => {
      const n = M.randInt(12, 89);
      return { q: `${n} × 9`, a: n * 9 };
    },
    () => {
      const n = M.randInt(3, 19) * 5;
      return { q: `${n}²`, a: n * n };
    },
    () => {
      const n = M.randInt(21, 99);
      return { q: `${n}²`, a: n * n };
    },
    () => {
      const p = M.pick([10, 20, 25, 50, 5]);
      const n = M.randInt(4, 40) * 10;
      return { q: `${p} % de ${n}`, a: (n * p) / 100 };
    },
    () => {
      const d = M.pick([2, 3, 4, 5]);
      const n = M.randInt(2, 12) * d;
      return { q: `${M.frac(1, d)} de ${n}`, a: n / d };
    },
    () => {
      const n = M.randInt(4, 20) * 5;
      const t = M.pick([10, 20, 25, 50]);
      return { q: `${n} + ${t} %`, a: n * (1 + t / 100) };
    },
    () => {
      const n = M.randInt(4, 20) * 5;
      const t = M.pick([10, 20, 25, 50]);
      return { q: `${n} − ${t} %`, a: n * (1 - t / 100) };
    },
    () => {
      const a = M.randInt(2, 9);
      const b = M.randInt(2, 9);
      const c = M.randInt(2, 9);
      return { q: `${a} + ${b} × ${c}`, a: a + b * c };
    },
    () => {
      const n = M.randInt(2, 9);
      return { q: `${n}³`, a: n ** 3 };
    },
  ];

  slides.push({
    id: 'bases-chrono',
    chapter: 'bases',
    title: 'Chrono 60 s',
    build(el) {
      el.innerHTML =
        M.head(
          'Bases · 4',
          'Chrono 60 s',
          'Le seul moyen de rendre un réflexe automatique : le répéter vite. Types de questions mélangés, une minute, on recommence.',
        ) +
        `<div class="card chrono">
          <div class="chrono-top">
            <div class="stat"><span>Score</span><strong id="ch-score">0</strong></div>
            <div class="stat"><span>Série</span><strong id="ch-streak">0</strong></div>
            <div class="stat"><span>Record</span><strong id="ch-best">—</strong></div>
            <div class="stat"><span>Temps</span><strong id="ch-time">60,0</strong></div>
          </div>
          <div class="timerbar"><span id="ch-bar"></span></div>
          <p class="question" id="ch-q">Prêt ?</p>
          <div class="answer-row">
            <input id="ch-ans" inputmode="decimal" autocomplete="off" placeholder="Ta réponse" aria-label="Réponse">
            <button class="btn primary" id="ch-ok" type="button">Valider</button>
          </div>
          <div class="feedback" id="ch-fb"></div>
          <div class="chrono-actions">
            <button class="btn primary" id="ch-start" type="button">Démarrer les 60 s</button>
            <button class="btn ghost" id="ch-stop" type="button" hidden>Arrêter</button>
          </div>
          <p class="hint">Entrée pour valider · tables, compléments, ×11, ×9, carrés, fractions, pourcentages, priorités.</p>
        </div>`;

      const scoreEl = el.querySelector('#ch-score');
      const streakEl = el.querySelector('#ch-streak');
      const bestEl = el.querySelector('#ch-best');
      const timeEl = el.querySelector('#ch-time');
      const barEl = el.querySelector('#ch-bar');
      const questionEl = el.querySelector('#ch-q');
      const input = el.querySelector('#ch-ans');
      const feedback = el.querySelector('#ch-fb');
      const startBtn = el.querySelector('#ch-start');
      const stopBtn = el.querySelector('#ch-stop');

      const BEST_KEY = 'maths.chrono.best';

      function readBest() {
        try {
          return Number(localStorage.getItem(BEST_KEY)) || 0;
        } catch (err) {
          return 0;
        }
      }

      function writeBest(value) {
        try {
          localStorage.setItem(BEST_KEY, String(value));
        } catch (err) {
          /* file:// with storage disabled: ignore */
        }
      }

      let running = false;
      let locked = false;
      let score = 0;
      let streak = 0;
      let answered = 0;
      let question = null;
      let deadline = 0;
      let interval = 0;
      let pending = 0;
      let duration = 60000;

      const best = readBest();
      bestEl.textContent = best > 0 ? String(best) : '—';

      function updateStats() {
        scoreEl.textContent = String(score);
        streakEl.textContent = String(streak);
      }

      function newQuestion() {
        question = M.pick(generators)();
        questionEl.innerHTML = question.q;
        input.value = '';
        locked = false;
        input.focus();
      }

      function tick() {
        const left = Math.max(0, deadline - performance.now());
        timeEl.textContent = (left / 1000).toFixed(1).replace('.', ',');
        barEl.style.width = `${(left / duration) * 100}%`;
        if (left <= 0) finish();
      }

      function start() {
        clearInterval(interval);
        clearTimeout(pending);
        running = true;
        locked = false;
        score = 0;
        streak = 0;
        answered = 0;
        feedback.textContent = '';
        feedback.className = 'feedback';
        updateStats();
        startBtn.hidden = true;
        stopBtn.hidden = false;
        timeEl.textContent = '60,0';
        barEl.style.width = '100%';
        input.disabled = false;
        deadline = performance.now() + duration;
        newQuestion();
        tick();
        interval = setInterval(tick, 100);
        input.focus();
      }

      function finish() {
        running = false;
        clearInterval(interval);
        clearTimeout(pending);
        interval = 0;
        toDefaultState();
        questionEl.textContent = 'Temps écoulé';
        const precision = answered ? Math.round((score / answered) * 100) : 0;
        feedback.className = 'feedback';
        feedback.textContent = `Score ${score} sur ${answered} réponses · précision ${precision} %`;
        if (score > readBest()) {
          writeBest(score);
          bestEl.textContent = String(score);
          feedback.textContent += ' · nouveau record';
        }
        startBtn.hidden = false;
        startBtn.textContent = 'Rejouer';
      }

      function toDefaultState() {
        stopBtn.hidden = true;
        input.disabled = true;
        locked = true;
        timeEl.textContent = '0,0';
        barEl.style.width = '0%';
      }

      function stop() {
        running = false;
        clearInterval(interval);
        clearTimeout(pending);
        interval = 0;
        questionEl.textContent = 'Arrêté';
        feedback.className = 'feedback';
        feedback.textContent = `Score : ${score}`;
        startBtn.hidden = false;
        startBtn.textContent = 'Rejouer';
        toDefaultState();
      }

      function submit() {
        if (!running || locked || !question) return;
        const value = M.num(input.value);
        if (!Number.isFinite(value)) {
          feedback.className = 'feedback';
          feedback.textContent = 'Tape un nombre.';
          return;
        }
        answered += 1;
        if (Math.abs(value - question.a) < 1e-9) {
          score += 1;
          streak += 1;
          feedback.className = 'feedback ok';
          feedback.textContent = M.pick(['Exact', 'Bien', 'Oui', '✓']);
          newQuestion();
        } else {
          streak = 0;
          locked = true;
          feedback.className = 'feedback bad';
          feedback.innerHTML = `✗ ${question.q} = ${M.com(question.a, 3)}`;
          clearTimeout(pending);
          pending = setTimeout(() => {
            if (!running) return;
            feedback.textContent = '';
            newQuestion();
          }, 1100);
        }
        updateStats();
      }

      startBtn.addEventListener('click', start);
      stopBtn.addEventListener('click', stop);
      el.querySelector('#ch-ok').addEventListener('click', submit);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') submit();
      });

      toDefaultState();
      input.disabled = true;

      return () => {
        clearInterval(interval);
        clearTimeout(pending);
      };
    },
  });

  /* ------------------------------------------------------------------ */
  /* 5. Orders of magnitude                                              */
  /* ------------------------------------------------------------------ */

  slides.push({
    id: 'bases-ordres',
    chapter: 'bases',
    title: 'Ordres de grandeur',
    build(el) {
      const items = [
        { q: '19,8 × 4,9', options: ['9,7', '97', '970'], good: '97', why: '≈ 20 × 5 = 100' },
        { q: '51 % de 198', options: ['10', '100', '1 000'], good: '100', why: '51 % ≈ la moitié : 198 ÷ 2 ≈ 100' },
        { q: '297 ÷ 3', options: ['33', '99', '990'], good: '99', why: '300 ÷ 3 = 100, un peu moins' },
        { q: '7,9 × 0,51', options: ['0,4', '4', '40'], good: '4', why: '≈ 8 × 0,5 = 4' },
        { q: '0,98 × 412', options: ['40', '400', '4 000'], good: '400', why: '≈ 1 × 412, donc ≈ 400' },
        { q: '99 × 21', options: ['200', '2 000', '20 000'], good: '2 000', why: '≈ 100 × 21 = 2 100' },
      ];

      el.innerHTML =
        M.head(
          'Bases · 5',
          'Ordres de grandeur',
          'Avant de calculer juste, il faut savoir à peu près combien. Un résultat faux d\u2019un facteur 10, c\u2019est une erreur d\u2019ordre de grandeur : ça se voit.',
        ) +
        `<div class="card">
          <div class="drill-meta" style="margin-top:0">
            <span id="om-count">Question 1 sur ${items.length}</span>
            <span id="om-score">0 bonne réponse</span>
          </div>
          <p class="question small" id="om-q">…</p>
          <div class="presets" id="om-options"></div>
          <div class="feedback" id="om-fb"></div>
          <div class="chrono-actions" style="justify-content:flex-start">
            <button class="btn" id="om-next" type="button" hidden>Suivant →</button>
            <button class="btn ghost" id="om-restart" type="button">Recommencer</button>
          </div>
        </div>`;

      const qEl = el.querySelector('#om-q');
      const optionsEl = el.querySelector('#om-options');
      const feedback = el.querySelector('#om-fb');
      const countEl = el.querySelector('#om-count');
      const scoreEl = el.querySelector('#om-score');
      const nextBtn = el.querySelector('#om-next');

      let index = 0;
      let score = 0;
      let answered = false;

      function render() {
        const item = items[index];
        answered = false;
        qEl.textContent = item.q;
        countEl.textContent = `Question ${index + 1} sur ${items.length}`;
        feedback.className = 'feedback';
        feedback.textContent = '';
        nextBtn.hidden = true;
        optionsEl.innerHTML = '';
        item.options.forEach((option) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'btn';
          button.textContent = option;
          button.addEventListener('click', () => choose(button, option));
          optionsEl.appendChild(button);
        });
      }

      function choose(button, option) {
        if (answered) return;
        answered = true;
        const item = items[index];
        optionsEl.querySelectorAll('button').forEach((b) => {
          b.disabled = true;
          if (b.textContent === item.good) b.classList.add('primary');
        });
        if (option === item.good) {
          score += 1;
          feedback.className = 'feedback ok';
          feedback.textContent = `Oui : ${item.why}.`;
        } else {
          button.classList.remove('primary');
          feedback.className = 'feedback bad';
          feedback.textContent = `Non : ${item.why}.`;
        }
        scoreEl.textContent = `${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''}`;
        if (index < items.length - 1) nextBtn.hidden = false;
        else feedback.textContent += ' — série terminée.';
      }

      nextBtn.addEventListener('click', () => {
        index += 1;
        render();
      });
      el.querySelector('#om-restart').addEventListener('click', () => {
        index = 0;
        score = 0;
        scoreEl.textContent = '0 bonne réponse';
        render();
      });

      render();
    },
  });
})();
