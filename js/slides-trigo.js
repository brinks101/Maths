// Chapter "Trigonométrie": one figure and its formulas per slide, very large type.
(function () {
  'use strict';

  const M = window.M;
  const slides = (window.MATHS_SLIDES = window.MATHS_SLIDES || []);

  const INK = '#f6f1e8';
  const MUTED = 'rgba(246, 241, 232, 0.5)';
  const AXIS = 'rgba(246, 241, 232, 0.22)';
  const ACCENT = '#b4a8f0';
  const COS = '#e3c79e';
  const SIN = '#8fcbb6';
  const SOLUTION = '#7cb0ff';

  const f = (num, den) => M.frac(num, den);
  const R2 = M.sqrt('2');
  const R3 = M.sqrt('3');

  /* ------------------------------------------------------------------ */
  /* Drawing helpers                                                     */
  /* ------------------------------------------------------------------ */

  function circlePos(w, h) {
    return { cx: w * 0.5, cy: h * 0.5, R: Math.min(w * 0.37, h * 0.35) };
  }

  function baseCircle(ctx, w, h) {
    const g = circlePos(w, h);
    const fs = M.textScale(w, h, 380);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.055)';
    [0.25, 0.5, 0.75].forEach((k) => {
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, g.R * k, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.strokeStyle = AXIS;
    ctx.beginPath();
    ctx.moveTo(g.cx - g.R - 20, g.cy);
    ctx.lineTo(g.cx + g.R + 20, g.cy);
    ctx.moveTo(g.cx, g.cy - g.R - 20);
    ctx.lineTo(g.cx, g.cy + g.R + 20);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.34)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(g.cx, g.cy, g.R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(246, 241, 232, 0.5)';
    ctx.font = `${11 * fs}px system-ui, sans-serif`;
    ctx.fillText('1', g.cx + g.R - 2, g.cy + 16 * fs);
    ctx.fillText('−1', g.cx - g.R - 14 * fs, g.cy + 16 * fs);
    ctx.fillText('O', g.cx - 16 * fs, g.cy + 16 * fs);
    ctx.restore();
    return g;
  }

  function pointAt(g, deg) {
    const rad = (deg * Math.PI) / 180;
    return { x: g.cx + g.R * Math.cos(rad), y: g.cy - g.R * Math.sin(rad), rad };
  }

  function dot(ctx, x, y, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size || 5, 0, Math.PI * 2);
    ctx.fill();
  }

  function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  /* ------------------------------------------------------------------ */
  /* Figures                                                             */
  /* ------------------------------------------------------------------ */

  function drawTriangle(ctx, w, h, deg, hyp) {
    const fs = M.textScale(w, h, 380);
    const rad = (deg * Math.PI) / 180;
    const L = Math.min(w * 0.6, h * 0.72);
    const adj = L * Math.cos(rad);
    const opp = L * Math.sin(rad);
    const A = { x: w * 0.16, y: h * 0.82 };
    const B = { x: A.x + adj, y: A.y };
    const C = { x: B.x, y: A.y - opp };

    ctx.fillStyle = 'rgba(180, 168, 240, 0.12)';
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2.6;
    ctx.stroke();

    const m = Math.min(16 * fs, adj * 0.3, opp * 0.3);
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.5)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(B.x - m, B.y);
    ctx.lineTo(B.x - m, B.y - m);
    ctx.lineTo(B.x, B.y - m);
    ctx.stroke();

    const r = Math.min(56 * fs, adj * 0.45);
    if (r > 8) {
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(A.x, A.y, r, 0, -rad, true);
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.font = `600 ${14 * fs}px system-ui, sans-serif`;
      ctx.fillText('θ', A.x + r * 0.55, A.y - r * 0.3);
    }

    ctx.font = `${13 * fs}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = COS;
    ctx.fillText('adjacent', (A.x + B.x) / 2, A.y + 22 * fs);
    ctx.save();
    ctx.translate(B.x + 14 * fs, (B.y + C.y) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = SIN;
    ctx.fillText('opposé', 0, 0);
    ctx.restore();
    ctx.save();
    ctx.translate((A.x + C.x) / 2, (A.y + C.y) / 2);
    ctx.rotate(Math.atan2(C.y - A.y, C.x - A.x));
    ctx.fillStyle = INK;
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillText('hypoténuse', 0, -12 * fs);
    ctx.restore();
    ctx.restore && ctx.restore();

    dot(ctx, A.x, A.y, INK, 3.4);
    dot(ctx, B.x, B.y, INK, 3.4);
    dot(ctx, C.x, C.y, INK, 3.4);
    ctx.textAlign = 'left';
    return hyp;
  }

  function drawCircle(ctx, w, h, deg) {
    const g = baseCircle(ctx, w, h);
    const fs = M.textScale(w, h, 380);
    const p = pointAt(g, deg);
    const cosX = g.cx + g.R * Math.cos(p.rad);

    ctx.fillStyle = 'rgba(180, 168, 240, 0.10)';
    ctx.beginPath();
    ctx.moveTo(g.cx, g.cy);
    ctx.lineTo(cosX, g.cy);
    ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(246, 241, 232, 0.85)';
    ctx.lineWidth = 2.6;
    line(ctx, g.cx, g.cy, p.x, p.y);

    ctx.lineWidth = 6;
    ctx.strokeStyle = COS;
    line(ctx, g.cx, g.cy, cosX, g.cy);
    ctx.strokeStyle = SIN;
    line(ctx, cosX, g.cy, p.x, p.y);

    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillStyle = INK;
    ctx.fillText('1', (g.cx + p.x) / 2 + 5 * fs, (g.cy + p.y) / 2 - 8 * fs);
    ctx.font = `${13 * fs}px system-ui, sans-serif`;
    ctx.fillStyle = COS;
    ctx.fillText('cos θ', (g.cx + cosX) / 2 - 16 * fs, g.cy + (p.y > g.cy ? -10 : 20) * fs);
    ctx.fillStyle = SIN;
    ctx.fillText('sin θ', cosX + 9 * fs, (g.cy + p.y) / 2);
    dot(ctx, p.x, p.y, INK, 5.5);
    ctx.fillStyle = INK;
    ctx.font = `600 ${14 * fs}px system-ui, sans-serif`;
    ctx.fillText('M', p.x + 9 * fs, p.y - 9 * fs);
  }

  function drawTangent(ctx, w, h, deg) {
    const g = baseCircle(ctx, w, h);
    const fs = M.textScale(w, h, 380);
    const p = pointAt(g, deg);
    const tanPx = g.R * Math.tan(p.rad);
    const limit = Math.min(g.cy - 14, h - g.cy - 14);
    const shown = Math.max(-limit, Math.min(limit, tanPx));

    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.3)';
    ctx.lineWidth = 1.4;
    line(ctx, g.cx + g.R, 8, g.cx + g.R, h - 8);
    ctx.strokeStyle = 'rgba(180, 168, 240, 0.5)';
    line(ctx, g.cx, g.cy, g.cx + g.R, g.cy - shown);
    ctx.restore();

    ctx.strokeStyle = 'rgba(246, 241, 232, 0.55)';
    ctx.lineWidth = 1.8;
    line(ctx, g.cx, g.cy, p.x, p.y);

    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 6;
    line(ctx, g.cx + g.R, g.cy, g.cx + g.R, g.cy - shown);
    dot(ctx, g.cx + g.R, g.cy - shown, ACCENT, 5);
    ctx.fillStyle = ACCENT;
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillText('tan θ', g.cx + g.R + 10 * fs, Math.max(20, g.cy - shown));
    dot(ctx, p.x, p.y, INK, 5.5);
    ctx.fillStyle = MUTED;
    ctx.font = `${12 * fs}px system-ui, sans-serif`;
    ctx.fillText('x = 1', g.cx + g.R + 8 * fs, g.cy + 18 * fs);
  }

  const ASSOCIATED = [
    {
      id: 'trigo-sym-oppose',
      label: '−x',
      cosText: 'cos x',
      sinText: '−sin x',
      transform: (d) => 360 - d,
      sym: 'ox',
      why: 'Symétrie d’axe (Ox).',
    },
    {
      id: 'trigo-sym-pi-moins',
      label: 'π − x',
      cosText: '−cos x',
      sinText: 'sin x',
      transform: (d) => 180 - d,
      sym: 'oy',
      why: 'Symétrie d’axe (Oy).',
    },
    {
      id: 'trigo-sym-pi-plus',
      label: 'π + x',
      cosText: '−cos x',
      sinText: '−sin x',
      transform: (d) => 180 + d,
      sym: 'o',
      why: 'Symétrie de centre O.',
    },
    {
      id: 'trigo-sym-deux-pi-moins',
      label: '2π − x',
      cosText: 'cos x',
      sinText: '−sin x',
      transform: (d) => 360 - d,
      sym: 'ox',
      why: 'Même point que −x.',
    },
    {
      id: 'trigo-sym-demi-moins',
      label: 'π/2 − x',
      cosText: 'sin x',
      sinText: 'cos x',
      transform: (d) => 90 - d,
      sym: 'bissec',
      why: 'Symétrie d’axe y = x : abscisse et ordonnée s’échangent.',
    },
    {
      id: 'trigo-sym-demi-plus',
      label: 'π/2 + x',
      cosText: '−sin x',
      sinText: 'cos x',
      transform: (d) => 90 + d,
      sym: 'quart',
      why: 'Quart de tour : l’abscisse devient −sin, l’ordonnée devient cos.',
    },
  ];

  function drawAssociated(ctx, w, h, cfg, deg) {
    const g = baseCircle(ctx, w, h);
    const fs = M.textScale(w, h, 380);
    const p = pointAt(g, deg);
    const aDeg = ((Math.round(cfg.transform(deg)) % 360) + 360) % 360;
    const q = pointAt(g, aDeg);

    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.32)';
    if (cfg.sym === 'ox') line(ctx, g.cx - g.R - 14, g.cy, g.cx + g.R + 14, g.cy);
    else if (cfg.sym === 'oy') line(ctx, g.cx, g.cy - g.R - 14, g.cx, g.cy + g.R + 14);
    else if (cfg.sym === 'o') line(ctx, p.x, p.y, q.x, q.y);
    else if (cfg.sym === 'bissec') {
      const d = g.R * 0.92;
      line(ctx, g.cx - d, g.cy + d, g.cx + d, g.cy - d);
    } else if (cfg.sym === 'quart') {
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(180, 168, 240, 0.55)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, g.R * 0.3, -p.rad, -((deg + 90) * Math.PI) / 180, true);
      ctx.stroke();
    }
    ctx.restore();

    ctx.lineWidth = 2.4;
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.6)';
    line(ctx, g.cx, g.cy, p.x, p.y);
    ctx.strokeStyle = COS;
    line(ctx, g.cx, g.cy, q.x, q.y);

    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(246, 241, 232, 0.22)';
    line(ctx, q.x, q.y, q.x, g.cy);
    line(ctx, q.x, q.y, g.cx, q.y);
    ctx.restore();

    dot(ctx, p.x, p.y, INK, 5.5);
    ctx.fillStyle = INK;
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillText('M (x)', p.x + 9 * fs, p.y - 9 * fs);
    dot(ctx, q.x, q.y, COS, 5.5);
    ctx.fillStyle = COS;
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillText(`M’ (${cfg.label})`, q.x + 9 * fs, q.y + 20 * fs);
  }

  /* ------------------------------------------------------------------ */
  /* 1. Right triangle                                                   */
  /* ------------------------------------------------------------------ */

  slides.push({
    id: 'trigo-triangle',
    chapter: 'trigo',
    title: 'Triangle rectangle',
    build(el) {
      el.innerHTML =
        M.head('Trigonométrie · 1', 'Triangle rectangle', '') +
        `<div class="grid2 figures">
          <div class="card figure-card">
            <canvas class="plot tall" id="tri-canvas" aria-label="Triangle rectangle"></canvas>
            <div id="tri-angle"></div>
          </div>
          <div class="big-forms">
            <div class="formula xl">sin θ = ${f('opposé', 'hypoténuse')}</div>
            <div class="formula xl">cos θ = ${f('adjacent', 'hypoténuse')}</div>
            <div class="formula xl">tan θ = ${f('opposé', 'adjacent')}</div>
          </div>
        </div>`;
      const state = { deg: 35 };
      const view = M.setupCanvas(el.querySelector('#tri-canvas'), (ctx, w, h) =>
        drawTriangle(ctx, w, h, state.deg, 10),
      );
      M.slider(el.querySelector('#tri-angle'), {
        label: 'Angle θ',
        min: 15,
        max: 75,
        value: state.deg,
        format: (v) => `${M.com(v, 0)}°`,
        onInput: (value) => {
          state.deg = value;
          view.redraw();
        },
      });
      return () => view.destroy();
    },
  });

  /* 2. Unit circle                                                      */

  slides.push({
    id: 'trigo-cercle',
    chapter: 'trigo',
    title: 'Cercle trigonométrique',
    build(el) {
      el.innerHTML =
        M.head('Trigonométrie · 2', 'Cercle trigonométrique', '') +
        `<div class="grid2 figures">
          <div class="card figure-card">
            <canvas class="plot tall" id="cercle-canvas" aria-label="Cercle trigonométrique"></canvas>
            <div id="cercle-angle"></div>
          </div>
          <div class="big-forms">
            <div class="formula xl">cos θ = abscisse</div>
            <div class="formula xl">sin θ = ordonnée</div>
            <div class="formula xl">cos² θ + sin² θ = 1</div>
          </div>
        </div>`;
      const state = { deg: 30 };
      const view = M.setupCanvas(el.querySelector('#cercle-canvas'), (ctx, w, h) =>
        drawCircle(ctx, w, h, state.deg),
      );
      M.slider(el.querySelector('#cercle-angle'), {
        label: 'Angle θ',
        min: 0,
        max: 360,
        value: state.deg,
        format: (v) => `${M.com(v, 0)}°`,
        onInput: (value) => {
          state.deg = value;
          view.redraw();
        },
      });
      return () => view.destroy();
    },
  });

  /* 3. Tangent                                                          */

  slides.push({
    id: 'trigo-tangente',
    chapter: 'trigo',
    title: 'Tangente',
    build(el) {
      el.innerHTML =
        M.head('Trigonométrie · 3', 'Tangente', '') +
        `<div class="grid2 figures">
          <div class="card figure-card">
            <canvas class="plot tall" id="tan-canvas" aria-label="Tangente sur le cercle"></canvas>
            <div id="tan-angle"></div>
          </div>
          <div class="big-forms">
            <div class="formula xl">tan θ = ${f('sin θ', 'cos θ')}</div>
            <div class="formula xl">tan θ = ${f('opposé', 'adjacent')}</div>
            <div class="formula lg">x ≠ ${f('π', '2')} + kπ</div>
          </div>
        </div>`;
      const state = { deg: 40 };
      const view = M.setupCanvas(el.querySelector('#tan-canvas'), (ctx, w, h) =>
        drawTangent(ctx, w, h, state.deg),
      );
      M.slider(el.querySelector('#tan-angle'), {
        label: 'Angle θ',
        min: 0,
        max: 180,
        step: 5,
        value: state.deg,
        format: (v) => `${M.com(v, 0)}°`,
        onInput: (value) => {
          state.deg = value;
          view.redraw();
        },
      });
      return () => view.destroy();
    },
  });

  /* 4. Remarkable values, from 0 to π/2 only                            */

  slides.push({
    id: 'trigo-valeurs',
    chapter: 'trigo',
    title: 'Valeurs remarquables',
    build(el) {
      const rows = [0, 30, 45, 60, 90];
      const body = rows
        .map((deg) => {
          const ex = M.exact(deg);
          return `<tr><td>${deg}°</td><td>${M.fmtPi(deg)}</td><td>${ex.cos}</td><td>${ex.sin}</td><td>${ex.tan}</td></tr>`;
        })
        .join('');

      el.innerHTML =
        M.head('Trigonométrie · 4', 'Valeurs remarquables', '') +
        `<div class="table-wrap plain">
          <table class="math rtable">
            <thead><tr><th>Angle</th><th>Radians</th><th>cos</th><th>sin</th><th>tan</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
        <p class="say">Deux triangles suffisent : 30-60-90 et 45-45-90.</p>`;
    },
  });

  /* 5–10. One associated angle per slide                                */

  ASSOCIATED.forEach((cfg, i) => {
    slides.push({
      id: cfg.id,
      chapter: 'trigo',
      title: `Angle associé : ${cfg.label}`,
      build(el) {
        el.innerHTML =
          M.head(`Trigonométrie · ${i + 5}`, `Angle associé : ${cfg.label}`, '') +
          `<div class="grid2 figures">
            <div class="card figure-card">
              <canvas class="plot tall as-canvas" aria-label="Angle associé sur le cercle"></canvas>
              <div class="as-angle"></div>
            </div>
            <div class="big-forms">
              <div class="formula xl">cos(${cfg.label}) = ${cfg.cosText}</div>
              <div class="formula xl">sin(${cfg.label}) = ${cfg.sinText}</div>
            </div>
          </div>
          <p class="say">${cfg.why}</p>`;
        const state = { deg: 30 };
        const view = M.setupCanvas(el.querySelector('.as-canvas'), (ctx, w, h) =>
          drawAssociated(ctx, w, h, cfg, state.deg),
        );
        M.slider(el.querySelector('.as-angle'), {
          label: 'Angle x',
          min: 0,
          max: 180,
          step: 5,
          value: state.deg,
          format: (v) => `${M.com(v, 0)}°`,
          onInput: (value) => {
            state.deg = value;
            view.redraw();
          },
        });
        return () => view.destroy();
      },
    });
  });

  /* 11–12. Equation or inequation, cos then sin: the whole solution is the
     part of the disk on one side of the line x = a (or y = a), restricted to
     the interval I in which the equation is solved. */

  const TAU = Math.PI * 2;
  const SOLUTION_FILL = 'rgba(96, 150, 255, 0.10)';
  const SOLUTION_HATCH = 'rgba(112, 162, 255, 0.42)';
  const SOLUTION_ARC = 'rgba(126, 172, 255, 0.75)';
  const SOLUTION_FAINT = 'rgba(130, 175, 255, 0.26)';
  const DOMAIN_COLOR = '#e0695e';

  // rel.dir: 0 for =, −1 for ≤, +1 for ≥.
  const RELATIONS = [
    { sym: '=', dir: 0 },
    { sym: '≤', dir: -1 },
    { sym: '≥', dir: 1 },
  ];

  // An angle as pπ/q when it is close to it, in radians otherwise.
  function fmtAngle(t) {
    if (Math.abs(t) < 1e-9) return '0';
    const k = t / Math.PI;
    for (let q = 1; q <= 12; q += 1) {
      const p = Math.round(k * q);
      if (Math.abs(k - p / q) < 1e-6) {
        const g = M.gcd(p, q);
        const num = p / g;
        const den = q / g;
        const sign = num < 0 ? '−' : '';
        const top = (Math.abs(num) === 1 ? '' : Math.abs(num)) + 'π';
        return den === 1 ? sign + top : `${sign}${top}/${den}`;
      }
    }
    return M.com(t, 2);
  }

  // A solution angle: always a multiple of π, with two decimals at most, so
  // an inexact bound shows like 0,65π instead of a bare radian value.
  function fmtPiAngle(t) {
    if (Math.abs(t) < 1e-9) return '0';
    const k = t / Math.PI;
    for (let q = 1; q <= 12; q += 1) {
      const p = Math.round(k * q);
      if (Math.abs(k - p / q) < 1e-6) {
        const g = M.gcd(p, q);
        const num = p / g;
        const den = q / g;
        const sign = num < 0 ? '−' : '';
        const top = (Math.abs(num) === 1 ? '' : Math.abs(num)) + 'π';
        return den === 1 ? sign + top : `${sign}${top}/${den}`;
      }
    }
    const dp = Math.abs(k) < 0.005 ? 3 : 2;
    return `${M.com(k, dp)}π`;
  }

  // Interval bounds are typed like in a maths book: 0, 2π, π/2, −π, 3π/2…
  function evalAngle(text) {
    const s = String(text)
      .replace(/pi/gi, 'π')
      .replace(/[−–]/g, '-')
      .replace(/,/g, '.')
      .replace(/\s+/g, '');
    if (!s) return NaN;
    let i = 0;
    const startsFactor = (c) => c === '(' || c === 'π' || (c >= '0' && c <= '9') || c === '.';
    function factor() {
      if (s[i] === '-') {
        i += 1;
        return -factor();
      }
      if (s[i] === '+') {
        i += 1;
        return factor();
      }
      if (s[i] === '(') {
        i += 1;
        const v = expr();
        if (s[i] !== ')') throw new Error('paren');
        i += 1;
        return v;
      }
      if (s[i] === 'π') {
        i += 1;
        return Math.PI;
      }
      const start = i;
      while (i < s.length && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) i += 1;
      if (start === i) throw new Error('value');
      return Number(s.slice(start, i));
    }
    function term() {
      let v = factor();
      for (;;) {
        if (s[i] === '*') {
          i += 1;
          v *= factor();
        } else if (s[i] === '/') {
          i += 1;
          v /= factor();
        } else if (startsFactor(s[i])) {
          v *= factor();
        } else {
          return v;
        }
      }
    }
    function expr() {
      let v = term();
      while (s[i] === '+' || s[i] === '-') {
        const op = s[i];
        i += 1;
        const r = term();
        v = op === '+' ? v + r : v - r;
      }
      return v;
    }
    try {
      const v = expr();
      return i === s.length && Number.isFinite(v) ? v : NaN;
    } catch (err) {
      return NaN;
    }
  }

  function inDomain(t, dom) {
    if (dom.hi < dom.lo) return false;
    if (dom.hi - dom.lo <= 1e-9) {
      return !dom.loOpen && !dom.hiOpen && Math.abs(t - dom.lo) <= 1e-9;
    }
    if (t < dom.lo - 1e-9 || t > dom.hi + 1e-9) return false;
    if (Math.abs(t - dom.lo) <= 1e-9 && dom.loOpen) return false;
    if (Math.abs(t - dom.hi) <= 1e-9 && dom.hiOpen) return false;
    return true;
  }

  function inDomainAnyPeriod(t, dom) {
    if (dom.hi < dom.lo) return false;
    const k0 = Math.ceil((dom.lo - t) / TAU) - 1;
    for (let k = k0; k <= k0 + 3; k += 1) {
      if (inDomain(t + k * TAU, dom)) return true;
    }
    return false;
  }

  function satisfies(axis, a, dir, t) {
    const v = axis === 'cos' ? Math.cos(t) : Math.sin(t);
    if (!dir) return Math.abs(v - a) <= 1e-9;
    return dir < 0 ? v <= a + 1e-9 : v >= a - 1e-9;
  }

  // Solution of cos x ⋚ a (or sin x ⋚ a) inside I: isolated points and/or
  // arcs, each arc carrying the open/closed state of its two ends.
  function computeSolution(axis, a, dir, dom) {
    const empty = { points: [], arcs: [] };
    const v = M.clamp(a, -1, 1);
    if (dom.hi < dom.lo - 1e-9) return empty;
    if (dom.hi - dom.lo <= 1e-9) {
      if (dom.loOpen || dom.hiOpen || !satisfies(axis, v, dir, dom.lo)) return empty;
      return { points: [dom.lo], arcs: [] };
    }

    const al = axis === 'cos' ? Math.acos(v) : Math.asin(v);
    const basePoints = axis === 'cos' ? [al, -al] : [al, Math.PI - al];
    const baseArcs = !dir
      ? []
      : axis === 'cos'
        ? dir < 0
          ? [[al, TAU - al]]
          : [[-al, al]]
        : dir < 0
          ? [[Math.PI - al, TAU + al]]
          : [[al, Math.PI - al]];

    const points = [];
    const arcs = [];
    const kMin = Math.floor((dom.lo - TAU) / TAU) - 1;
    const kMax = Math.min(Math.ceil((dom.hi + TAU) / TAU) + 1, kMin + 400);
    for (let k = kMin; k <= kMax; k += 1) {
      const off = k * TAU;
      basePoints.forEach((t) => {
        if (inDomain(t + off, dom)) points.push(t + off);
      });
      baseArcs.forEach((pair) => {
        const t0 = pair[0] + off;
        const t1 = pair[1] + off;
        const lo = Math.max(t0, dom.lo);
        const hi = Math.min(t1, dom.hi);
        if (hi <= lo + 1e-9) {
          if (Math.abs(t1 - t0) <= 1e-9 && inDomain(t0, dom)) points.push(t0);
          return;
        }
        arcs.push({
          t0: lo,
          t1: hi,
          closedL: !(Math.abs(lo - dom.lo) <= 1e-9 && dom.loOpen),
          closedR: !(Math.abs(hi - dom.hi) <= 1e-9 && dom.hiOpen),
        });
      });
    }

    arcs.sort((p, q) => p.t0 - q.t0);
    const merged = [];
    arcs.forEach((arc) => {
      const last = merged[merged.length - 1];
      if (last && arc.t0 - last.t1 <= 1e-9) {
        last.t1 = Math.max(last.t1, arc.t1);
        last.closedR = arc.closedR;
      } else {
        merged.push(arc);
      }
    });

    points.sort((p, q) => p - q);
    const unique = [];
    points.forEach((t) => {
      if (!unique.length || Math.abs(t - unique[unique.length - 1]) > 1e-9) unique.push(t);
    });
    return { points: unique, arcs: merged };
  }

  function formatSet(set) {
    const arcs = set.arcs.map(
      (arc) =>
        `${arc.closedL ? '[' : ']'}${fmtPiAngle(arc.t0)} ; ${fmtPiAngle(arc.t1)}${arc.closedR ? ']' : '['}`,
    );
    const pts = set.points
      .filter((t) => !set.arcs.some((arc) => t >= arc.t0 - 1e-9 && t <= arc.t1 + 1e-9))
      .map(fmtPiAngle);
    const pieces = arcs.slice(0, 4);
    if (pts.length) {
      pieces.push(`{${pts.slice(0, 6).join(' ; ')}${pts.length > 6 ? ' ; …' : ''}}`);
    }
    if (!pieces.length) return '∅';
    return pieces.join(' ∪ ') + (arcs.length > 4 ? ' ∪ …' : '');
  }

  function arcPath(ctx, g, t0, t1, close) {
    const steps = Math.max(40, Math.min(240, Math.round(Math.abs(t1 - t0) * 30)));
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const t = t0 + ((t1 - t0) * i) / steps;
      const x = g.cx + g.R * Math.cos(t);
      const y = g.cy - g.R * Math.sin(t);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    if (close) ctx.closePath();
  }

  // Domain: a red rail just outside the circle, ends as dots or holes.
  function drawDomainRail(ctx, g, dom) {
    if (dom.hi > dom.lo) {
      const rail = g.R + 4.5;
      ctx.save();
      ctx.strokeStyle = DOMAIN_COLOR;
      ctx.lineWidth = 3;
      if (dom.hi - dom.lo >= TAU - 1e-9) {
        ctx.beginPath();
        ctx.arc(g.cx, g.cy, rail, 0, TAU);
        ctx.stroke();
      } else {
        const steps = 120;
        ctx.beginPath();
        for (let i = 0; i <= steps; i += 1) {
          const t = dom.lo + ((dom.hi - dom.lo) * i) / steps;
          const x = g.cx + rail * Math.cos(t);
          const y = g.cy - rail * Math.sin(t);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        [
          [dom.lo, dom.loOpen],
          [dom.hi, dom.hiOpen],
        ].forEach((pair) => {
          const t = pair[0];
          const open = pair[1];
          const x = g.cx + rail * Math.cos(t);
          const y = g.cy - rail * Math.sin(t);
          ctx.beginPath();
          ctx.arc(x, y, 4.6, 0, TAU);
          ctx.fillStyle = open ? '#191512' : DOMAIN_COLOR;
          ctx.fill();
          if (open) {
            ctx.strokeStyle = DOMAIN_COLOR;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
      ctx.restore();
    }

  }

  // unit circle, the line x = a (cos) or y = a (sin), the red rail of the
  // definition set I, and the solution hatched in blue inside the disk.
  function diskClip(ctx, g) {
    ctx.beginPath();
    ctx.arc(g.cx, g.cy, g.R, 0, TAU);
    ctx.clip();
  }

  // Keeps only the angles of I (the whole disk when I covers a full turn).
  function sectorClip(ctx, g, dom) {
    if (!(dom.hi > dom.lo) || dom.hi - dom.lo >= TAU - 1e-9) return;
    const steps = Math.max(60, Math.min(240, Math.round((dom.hi - dom.lo) * 30)));
    ctx.beginPath();
    ctx.moveTo(g.cx, g.cy);
    for (let i = 0; i <= steps; i += 1) {
      const t = dom.lo + ((dom.hi - dom.lo) * i) / steps;
      ctx.lineTo(g.cx + g.R * Math.cos(t), g.cy - g.R * Math.sin(t));
    }
    ctx.closePath();
    ctx.clip();
  }

  // Keeps the half-plane x ≥ a (or x ≤ a) for cos, y ≥ b (or y ≤ b) for sin.
  function halfPlaneClip(ctx, g, axis, dir, px, py) {
    ctx.beginPath();
    if (axis === 'cos') {
      const x0 = dir > 0 ? px : g.cx - g.R - 2;
      const x1 = dir > 0 ? g.cx + g.R + 2 : px;
      ctx.rect(x0, g.cy - g.R - 2, x1 - x0, g.R * 2 + 4);
    } else {
      const y0 = dir > 0 ? g.cy - g.R - 2 : py;
      const y1 = dir > 0 ? py : g.cy + g.R + 2;
      ctx.rect(g.cx - g.R - 2, y0, g.R * 2 + 4, y1 - y0);
    }
    ctx.clip();
  }

  // Light blue wash and diagonal hatching inside the current clip.
  function hatchBlue(ctx, g) {
    ctx.fillStyle = SOLUTION_FILL;
    ctx.fillRect(g.cx - g.R, g.cy - g.R, g.R * 2, g.R * 2);
    ctx.strokeStyle = SOLUTION_HATCH;
    ctx.lineWidth = Math.max(1, g.R * 0.013);
    const diag = g.R * 2;
    const step = Math.max(6, g.R * 0.09);
    for (let x = g.cx - diag * 2; x <= g.cx + g.R; x += step) {
      line(ctx, x, g.cy - g.R, x + diag, g.cy + g.R);
    }
  }

  // Is the angle t part of a solution set (isolated point or arc)?
  function pointInSet(set, t) {
    if (set.points.some((value) => Math.abs(value - t) <= 1e-9)) return true;
    return set.arcs.some((arc) => {
      if (t < arc.t0 - 1e-9 || t > arc.t1 + 1e-9) return false;
      if (Math.abs(t - arc.t0) <= 1e-9 && !arc.closedL) return false;
      if (Math.abs(t - arc.t1) <= 1e-9 && !arc.closedR) return false;
      return true;
    });
  }

  function mergeArcs(arcs) {
    arcs.sort((first, second) => first.t0 - second.t0);
    const merged = [];
    arcs.forEach((arc) => {
      const last = merged[merged.length - 1];
      const overlap =
        last &&
        (arc.t0 < last.t1 - 1e-9 ||
          (Math.abs(arc.t0 - last.t1) <= 1e-9 && (last.closedR || arc.closedL)));
      if (!overlap) {
        merged.push({ t0: arc.t0, t1: arc.t1, closedL: arc.closedL, closedR: arc.closedR });
        return;
      }
      if (arc.t1 > last.t1 + 1e-9) {
        last.t1 = arc.t1;
        last.closedR = arc.closedR;
      } else if (Math.abs(arc.t1 - last.t1) <= 1e-9) {
        last.closedR = last.closedR || arc.closedR;
      }
    });
    return merged;
  }

  // Common solutions of two relations solved in the same interval I.
  function intersectSets(first, second) {
    const arcs = [];
    const points = [];
    first.arcs.forEach((a) => {
      second.arcs.forEach((b) => {
        const t0 = Math.max(a.t0, b.t0);
        const t1 = Math.min(a.t1, b.t1);
        if (t1 < t0 - 1e-9) return;
        const closedL =
          (Math.abs(t0 - a.t0) > 1e-9 || a.closedL) &&
          (Math.abs(t0 - b.t0) > 1e-9 || b.closedL);
        const closedR =
          (Math.abs(t1 - a.t1) > 1e-9 || a.closedR) &&
          (Math.abs(t1 - b.t1) > 1e-9 || b.closedR);
        if (t1 - t0 <= 1e-9) {
          if (closedL && closedR) points.push(t0);
          return;
        }
        arcs.push({ t0, t1, closedL, closedR });
      });
    });
    const merged = mergeArcs(arcs);
    const kept = [];
    first.points.forEach((t) => {
      if (pointInSet(second, t)) kept.push(t);
    });
    second.points.forEach((t) => {
      if (pointInSet(first, t)) kept.push(t);
    });
    points.forEach((t) => {
      if (pointInSet(first, t) && pointInSet(second, t)) kept.push(t);
    });
    kept.sort((p, q) => p - q);
    const unique = [];
    kept.forEach((t) => {
      if (!unique.length || Math.abs(t - unique[unique.length - 1]) > 1e-9) unique.push(t);
    });
    const isolated = unique.filter(
      (t) => !merged.some((arc) => t > arc.t0 - 1e-9 && t < arc.t1 + 1e-9),
    );
    return { points: isolated, arcs: merged };
  }

  // The I editor: two bounds typed in radians, two open/closed brackets.
  function domainControls(root, state, onChange) {
    const bounds = Array.prototype.slice.call(root.querySelectorAll('.dom-bound'));
    const brackets = Array.prototype.slice.call(root.querySelectorAll('.dom-bracket'));

    function syncUI() {
      brackets.forEach((btn) => {
        const side = btn.dataset.side;
        const open = side === 'lo' ? state.dom.loOpen : state.dom.hiOpen;
        btn.textContent = side === 'lo' ? (open ? ']' : '[') : open ? '[' : ']';
        btn.setAttribute(
          'aria-label',
          `Borne ${side === 'lo' ? 'inférieure' : 'supérieure'} de I : ${
            open ? 'ouverte' : 'fermée'
          }, cliquer pour ${open ? 'fermer' : 'ouvrir'}`,
        );
      });
    }

    function commitBound(input) {
      const value = evalAngle(input.value);
      if (!Number.isFinite(value)) {
        input.classList.add('is-invalid');
        return false;
      }
      input.classList.remove('is-invalid');
      if (input.dataset.side === 'lo') state.dom.lo = value;
      else state.dom.hi = value;
      return true;
    }

    bounds.forEach((input) => {
      input.addEventListener('input', () => {
        // Typing “pi” turns it into π at once, like on paper.
        const caret = input.selectionStart || 0;
        const before = input.value.slice(0, caret);
        const next = input.value.replace(/pi/gi, 'π').replace(/[−–]/g, '-');
        if (next !== input.value) {
          input.value = next;
          const pos = before.replace(/pi/gi, 'π').length;
          input.setSelectionRange(pos, pos);
        }
        if (commitBound(input)) onChange();
      });
      input.addEventListener('blur', () => {
        if (!commitBound(input)) {
          input.value = fmtAngle(input.dataset.side === 'lo' ? state.dom.lo : state.dom.hi);
          input.classList.remove('is-invalid');
        }
      });
    });

    brackets.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.side === 'lo') state.dom.loOpen = !state.dom.loOpen;
        else state.dom.hiOpen = !state.dom.hiOpen;
        syncUI();
        onChange();
      });
    });

    syncUI();
  }

  function drawSolution(ctx, w, h, cfg) {
    const g = baseCircle(ctx, w, h);
    const fs = M.textScale(w, h, 380);
    const v = M.clamp(cfg.a, -1, 1);
    const axis = cfg.axis;
    const dom = cfg.dom;
    const tint = axis === 'cos' ? COS : SIN;
    const set = computeSolution(axis, v, cfg.dir, dom);
    const px = axis === 'cos' ? g.cx + g.R * v : g.cx;
    const py = axis === 'cos' ? g.cy : g.cy - g.R * v;
    const half = g.R * Math.sqrt(Math.max(0, 1 - v * v));

    // Solutions: the whole part of the disk on one side of the line x = a
    // (cos) or y = a (sin), kept inside the definition set I, washed and
    // hatched in blue.
    if (cfg.dir) {
      ctx.save();
      diskClip(ctx, g);
      sectorClip(ctx, g, dom);
      halfPlaneClip(ctx, g, axis, cfg.dir, px, py);
      hatchBlue(ctx, g);
      ctx.restore();
    }

    if (set.arcs.length) {
      ctx.save();
      ctx.strokeStyle = SOLUTION_ARC;
      ctx.lineWidth = 3.4;
      set.arcs.forEach((arc) => {
        if (arc.t1 - arc.t0 < 1e-6) return;
        arcPath(ctx, g, arc.t0, arc.t1, false);
        ctx.stroke();
      });
      ctx.restore();
    }

    drawDomainRail(ctx, g, dom);

    ctx.strokeStyle = tint;
    ctx.lineWidth = 2.4;
    if (axis === 'cos') line(ctx, px, g.cy - g.R - 14, px, g.cy + g.R + 14);
    else line(ctx, g.cx - g.R - 14, py, g.cx + g.R + 14, py);

    ctx.fillStyle = tint;
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.textAlign = 'left';
    if (axis === 'cos') {
      ctx.fillText('x = a', px + 9 * fs, g.cy - g.R - 12 * fs);
      ctx.font = `${12 * fs}px system-ui, sans-serif`;
      ctx.fillText('a', px + 7 * fs, g.cy - 8 * fs);
      dot(ctx, px, g.cy, tint, 3.4);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText('y = a', g.cx + g.R - 4 * fs, py - 10 * fs);
      ctx.font = `${12 * fs}px system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('a', g.cx + 7 * fs, py - 7 * fs);
      dot(ctx, g.cx, py, tint, 3.4);
    }

    // The line meets the circle in two points: solid when they solve the
    // equation inside I, faint when I leaves them out.
    const al = axis === 'cos' ? Math.acos(v) : Math.asin(v);
    const marks =
      axis === 'cos'
        ? [
            { x: px, y: g.cy - half, t: al },
            { x: px, y: g.cy + half, t: -al },
          ]
        : [
            { x: g.cx - half, y: py, t: Math.PI - al },
            { x: g.cx + half, y: py, t: al },
          ];
    marks.forEach((m) => {
      const solved = cfg.dir
        ? inDomainAnyPeriod(m.t, dom)
        : set.points.some(
            (t) =>
              Math.abs(Math.cos(t) - Math.cos(m.t)) < 1e-6 &&
              Math.abs(Math.sin(t) - Math.sin(m.t)) < 1e-6,
          );
      dot(ctx, m.x, m.y, solved ? SOLUTION : SOLUTION_FAINT, solved ? 6 : 4.5);
    });
  }

  function pushSolutionSlide(cfg) {
    slides.push({
      id: cfg.id,
      chapter: 'trigo',
      title: cfg.title,
      build(el) {
        const fn = cfg.axis;
        el.innerHTML =
          M.head(`Trigonométrie · ${cfg.n}`, cfg.title, '') +
          `<div class="grid2 figures">
            <div class="card figure-card">
              <canvas class="plot tall sol-canvas" aria-label="${cfg.title} sur le cercle"></canvas>
              <div class="sol-a"></div>
            </div>
            <div class="big-forms" data-focus-panel>
              <div class="formula xl sol-formula">${fn} x = a</div>
              <div class="rel-picker" role="group" aria-label="Relation"></div>
              <div class="sol-domain">
                <span class="sol-domain-label">Ensemble de définition I =</span>
                <span class="dom-edit">
                  <button type="button" class="dom-bracket" data-side="lo" aria-label="Borne inférieure de I">[</button>
                  <input class="dom-bound" data-side="lo" type="text" value="0" spellcheck="false" autocomplete="off" aria-label="Borne inférieure de I">
                  <span class="dom-sep">;</span>
                  <input class="dom-bound" data-side="hi" type="text" value="2π" spellcheck="false" autocomplete="off" aria-label="Borne supérieure de I">
                  <button type="button" class="dom-bracket" data-side="hi" aria-label="Borne supérieure de I">]</button>
                </span>
              </div>
              <p class="sol-answer" aria-live="polite"></p>
            </div>
          </div>`;

        const state = {
          a: 0.5,
          dir: 0,
          dom: { lo: 0, hi: TAU, loOpen: false, hiOpen: false },
        };
        const formula = el.querySelector('.sol-formula');
        const picker = el.querySelector('.rel-picker');
        const answer = el.querySelector('.sol-answer');
        const view = M.setupCanvas(el.querySelector('.sol-canvas'), (ctx, w, h) =>
          drawSolution(ctx, w, h, { axis: fn, a: state.a, dir: state.dir, dom: state.dom }),
        );

        function renderSolution() {
          const set = computeSolution(fn, state.a, state.dir, state.dom);
          answer.textContent = `S = ${formatSet(set)}`;
        }

        domainControls(el.querySelector('.big-forms'), state, () => {
          renderSolution();
          view.redraw();
        });

        RELATIONS.forEach((rel) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'rel-btn';
          btn.textContent = rel.sym;
          btn.setAttribute('aria-label', `${fn} x ${rel.sym} a`);
          const on = rel.dir === state.dir;
          btn.classList.toggle('is-on', on);
          btn.setAttribute('aria-pressed', String(on));
          btn.addEventListener('click', () => {
            state.dir = rel.dir;
            formula.textContent = `${fn} x ${rel.sym} a`;
            Array.prototype.forEach.call(picker.children, (b) => {
              const active = b === btn;
              b.classList.toggle('is-on', active);
              b.setAttribute('aria-pressed', String(active));
            });
            renderSolution();
            view.redraw();
          });
          picker.appendChild(btn);
        });

        M.slider(el.querySelector('.sol-a'), {
          label: 'Paramètre a',
          min: -1,
          max: 1,
          step: 0.05,
          value: state.a,
          format: (value) => `a = ${M.com(value, 2)}`,
          onInput: (value) => {
            state.a = value;
            renderSolution();
            view.redraw();
          },
        });

        renderSolution();
        return () => view.destroy();
      },
    });
  }

  // Two inequalities at once, one on cos (line x = a) and one on sin
  // (line y = b): S is their intersection, hatched blue inside I.
  function drawSystem(ctx, w, h, cfg) {
    const g = baseCircle(ctx, w, h);
    const fs = M.textScale(w, h, 380);
    const a = M.clamp(cfg.a, -1, 1);
    const b = M.clamp(cfg.b, -1, 1);
    const dom = cfg.dom;
    const px = g.cx + g.R * a;
    const py = g.cy - g.R * b;
    const halfA = g.R * Math.sqrt(Math.max(0, 1 - a * a));
    const halfB = g.R * Math.sqrt(Math.max(0, 1 - b * b));
    const setCos = computeSolution('cos', a, cfg.dirA, dom);
    const setSin = computeSolution('sin', b, cfg.dirB, dom);
    const set = intersectSets(setCos, setSin);

    if (cfg.dirA && cfg.dirB) {
      ctx.save();
      diskClip(ctx, g);
      sectorClip(ctx, g, dom);
      halfPlaneClip(ctx, g, 'cos', cfg.dirA, px, py);
      halfPlaneClip(ctx, g, 'sin', cfg.dirB, px, py);
      hatchBlue(ctx, g);
      ctx.restore();
    }

    if (set.arcs.length) {
      ctx.save();
      ctx.strokeStyle = SOLUTION_ARC;
      ctx.lineWidth = 3;
      set.arcs.forEach((arc) => {
        if (arc.t1 - arc.t0 < 1e-6) return;
        arcPath(ctx, g, arc.t0, arc.t1, false);
        ctx.stroke();
      });
      ctx.restore();
    }

    drawDomainRail(ctx, g, dom);

    ctx.lineWidth = 2.4;
    ctx.strokeStyle = COS;
    line(ctx, px, g.cy - g.R - 14, px, g.cy + g.R + 14);
    ctx.strokeStyle = SIN;
    line(ctx, g.cx - g.R - 14, py, g.cx + g.R + 14, py);

    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillStyle = COS;
    ctx.fillText('x = a', px + 9 * fs, g.cy - g.R - 12 * fs);
    ctx.font = `${12 * fs}px system-ui, sans-serif`;
    ctx.fillText('a', px + 7 * fs, g.cy - 8 * fs);
    dot(ctx, px, g.cy, COS, 3.4);
    ctx.font = `600 ${13 * fs}px system-ui, sans-serif`;
    ctx.fillStyle = SIN;
    ctx.fillText('y = b', g.cx + 9 * fs, py - 10 * fs);
    ctx.font = `${12 * fs}px system-ui, sans-serif`;
    ctx.fillText('b', g.cx + 7 * fs, py + 16 * fs);
    dot(ctx, g.cx, py, SIN, 3.4);

    // The four line/circle points: solid when they solve the system.
    const al = Math.acos(a);
    const be = Math.asin(b);
    const marks = [
      { x: px, y: g.cy - halfA, t: al },
      { x: px, y: g.cy + halfA, t: -al },
      { x: g.cx - halfB, y: py, t: Math.PI - be },
      { x: g.cx + halfB, y: py, t: be },
    ];
    marks.forEach((m) => {
      const solved = pointInSet(set, m.t);
      dot(ctx, m.x, m.y, solved ? SOLUTION : SOLUTION_FAINT, solved ? 6 : 4.5);
    });
  }

  function pushSystemSlide(cfg) {
    slides.push({
      id: cfg.id,
      chapter: 'trigo',
      title: cfg.title,
      build(el) {
        el.innerHTML =
          M.head(`Trigonométrie · ${cfg.n}`, cfg.title, '') +
          `<div class="grid2 figures">
            <div class="card figure-card">
              <canvas class="plot tall sol-canvas" aria-label="${cfg.title} sur le cercle"></canvas>
              <div class="sol-a"></div>
              <div class="sol-b"></div>
            </div>
            <div class="big-forms sol-system" data-focus-panel>
              <div class="sys-row">
                <div class="formula sol-formula" data-eq="cos">cos x ≥ a</div>
                <div class="rel-picker" data-eq="cos" role="group" aria-label="Relation sur cos"></div>
              </div>
              <div class="sys-row">
                <div class="formula sol-formula" data-eq="sin">sin x ≥ b</div>
                <div class="rel-picker" data-eq="sin" role="group" aria-label="Relation sur sin"></div>
              </div>
              <div class="sol-domain">
                <span class="sol-domain-label">Ensemble de définition I =</span>
                <span class="dom-edit">
                  <button type="button" class="dom-bracket" data-side="lo" aria-label="Borne inférieure de I">[</button>
                  <input class="dom-bound" data-side="lo" type="text" value="0" spellcheck="false" autocomplete="off" aria-label="Borne inférieure de I">
                  <span class="dom-sep">;</span>
                  <input class="dom-bound" data-side="hi" type="text" value="2π" spellcheck="false" autocomplete="off" aria-label="Borne supérieure de I">
                  <button type="button" class="dom-bracket" data-side="hi" aria-label="Borne supérieure de I">]</button>
                </span>
              </div>
              <p class="sol-answer" aria-live="polite"></p>
            </div>
          </div>`;

        const state = {
          a: 0.5,
          b: 0.5,
          dirA: 1,
          dirB: 1,
          dom: { lo: 0, hi: TAU, loOpen: false, hiOpen: false },
        };
        const answer = el.querySelector('.sol-answer');
        const formulas = {
          cos: el.querySelector('.sol-formula[data-eq="cos"]'),
          sin: el.querySelector('.sol-formula[data-eq="sin"]'),
        };
        const pickers = {
          cos: el.querySelector('.rel-picker[data-eq="cos"]'),
          sin: el.querySelector('.rel-picker[data-eq="sin"]'),
        };
        const view = M.setupCanvas(el.querySelector('.sol-canvas'), (ctx, w, h) =>
          drawSystem(ctx, w, h, {
            a: state.a,
            b: state.b,
            dirA: state.dirA,
            dirB: state.dirB,
            dom: state.dom,
          }),
        );

        function currentSet() {
          return intersectSets(
            computeSolution('cos', state.a, state.dirA, state.dom),
            computeSolution('sin', state.b, state.dirB, state.dom),
          );
        }

        function renderSolution() {
          answer.textContent = `S = ${formatSet(currentSet())}`;
        }

        domainControls(el.querySelector('.big-forms'), state, () => {
          renderSolution();
          view.redraw();
        });

        function buildPicker(axis) {
          const target = pickers[axis];
          const label = formulas[axis];
          const variable = axis === 'cos' ? 'a' : 'b';
          // A system of inequalities only: ≤ or ≥, no equality.
          RELATIONS.filter((rel) => rel.dir !== 0).forEach((rel) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'rel-btn';
            btn.textContent = rel.sym;
            btn.setAttribute('aria-label', `${axis} x ${rel.sym} ${variable}`);
            const on = rel.dir === (axis === 'cos' ? state.dirA : state.dirB);
            btn.classList.toggle('is-on', on);
            btn.setAttribute('aria-pressed', String(on));
            btn.addEventListener('click', () => {
              if (axis === 'cos') state.dirA = rel.dir;
              else state.dirB = rel.dir;
              label.textContent = `${axis} x ${rel.sym} ${variable}`;
              Array.prototype.forEach.call(target.children, (child) => {
                const active = child === btn;
                child.classList.toggle('is-on', active);
                child.setAttribute('aria-pressed', String(active));
              });
              renderSolution();
              view.redraw();
            });
            target.appendChild(btn);
          });
        }
        buildPicker('cos');
        buildPicker('sin');

        M.slider(el.querySelector('.sol-a'), {
          label: 'Paramètre a (cos)',
          min: -1,
          max: 1,
          step: 0.05,
          value: state.a,
          format: (value) => `a = ${M.com(value, 2)}`,
          onInput: (value) => {
            state.a = value;
            renderSolution();
            view.redraw();
          },
        });
        M.slider(el.querySelector('.sol-b'), {
          label: 'Paramètre b (sin)',
          min: -1,
          max: 1,
          step: 0.05,
          value: state.b,
          format: (value) => `b = ${M.com(value, 2)}`,
          onInput: (value) => {
            state.b = value;
            renderSolution();
            view.redraw();
          },
        });

        renderSolution();
        return () => view.destroy();
      },
    });
  }

  pushSolutionSlide({ id: 'trigo-equation-cos', n: 11, axis: 'cos', title: 'Équations · cos' });
  pushSolutionSlide({ id: 'trigo-equation-sin', n: 12, axis: 'sin', title: 'Équations · sin' });
  pushSystemSlide({ id: 'trigo-systeme-cos-sin', n: 13, title: 'Système · cos et sin' });
})();
