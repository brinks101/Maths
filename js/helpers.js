// Shared helpers for the maths deck. Classic script so file:// works.
window.M = (function () {
  'use strict';

  const formatters = new Map();

  // French number: decimal comma, typographic minus, thousands space.
  function com(x, d = 2) {
    if (typeof x !== 'number' || !Number.isFinite(x)) return '—';
    if (Math.abs(x) < 1e-10) x = 0;
    if (!formatters.has(d)) {
      formatters.set(d, new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d }));
    }
    return formatters.get(d).format(x).replace(/-/g, '−');
  }

  function frac(num, den) {
    return `<span class="frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  function sqrt(radicand) {
    return `<span class="sqrt"><span class="rad">${radicand}</span></span>`;
  }

  // Polynomial html: a x² + b x + c, skipping zero coefficients.
  function poly(a, b, c, v = 'x') {
    const terms = [];
    const add = (coef, varPart) => {
      if (!coef) return;
      const abs = Math.abs(coef);
      const body = abs === 1 && varPart ? varPart : com(abs, 6) + varPart;
      terms.push({ sign: coef < 0 ? '−' : '+', body });
    };
    add(a, v + '²');
    add(b, v);
    add(c, '');
    if (!terms.length) return '0';
    return terms
      .map((t, i) => (i === 0 ? (t.sign === '−' ? '−' : '') + t.body : ' ' + t.sign + ' ' + t.body))
      .join('');
  }

  function head(kicker, title, lead) {
    return (
      `<header class="slide-head">` +
      `<p class="kicker">${kicker}</p>` +
      `<h2 class="slide-title">${title}</h2>` +
      (lead ? `<p class="lead">${lead}</p>` : '') +
      `</header>`
    );
  }

  function randInt(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  // Read a user answer: "12", "12,5", "-3/4", "3 / 4".
  function num(str) {
    if (str == null) return NaN;
    const s = String(str)
      .trim()
      .replace(/[\s\u00a0\u202f]/g, '')
      .replace(/−/g, '-')
      .replace(',', '.');
    if (!s) return NaN;
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m) {
      const d = Number(m[2]);
      return d === 0 ? NaN : Number(m[1]) / d;
    }
    const v = Number(s);
    return Number.isFinite(v) ? v : NaN;
  }

  function close(a, b, tol = 1e-6) {
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
  }

  // Greatest common divisor of two integers (always at least 1).
  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a || 1;
  }

  // Reduced fraction as html: rat(6, -4) → −3/2, rat(4, 2) → 2.
  function rat(p, q) {
    if (!q) return '—';
    const g = gcd(p, q);
    p /= g;
    q /= g;
    if (q < 0) {
      p = -p;
      q = -q;
    }
    if (q === 1) return com(p);
    return frac(p < 0 ? `−${Math.abs(p)}` : String(p), String(q));
  }

  // Canvas label scale: enlarge text when the plot fills a big screen.
  function textScale(w, h, base = 380) {
    return clamp(Math.min(w, h) / base, 1, 2.2);
  }

  // Radians as an exact-looking multiple of π (multiples of 15° at least).
  function fmtPi(deg) {
    const t = deg / 180;
    for (let d = 1; d <= 12; d++) {
      const n = Math.round(t * d);
      if (Math.abs(t - n / d) < 1e-6) {
        if (n === 0) return '0';
        const sign = n < 0 ? '−' : '';
        const abs = Math.abs(n);
        const top = (abs === 1 ? '' : abs) + 'π';
        return d === 1 ? sign + top : sign + frac(top, d);
      }
    }
    return com((deg * Math.PI) / 180, 2) + ' rad';
  }

  // Canvas that stays sharp on resize. draw(ctx, width, height, cam) in CSS pixels.
  // cam.zoom is a camera factor: draw functions magnify the figure itself (fewer
  // units on screen), instead of the bitmap being stretched.
  function setupCanvas(canvas, draw) {
    const ctx = canvas.getContext('2d');
    const cam = { zoom: 1, panX: 0, panY: 0 };
    let raf = 0;
    let alive = true;

    function render() {
      if (!alive) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, cam);
    }

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    // Enlarging the window or entering fullscreen changes the canvas box too:
    // repaint explicitly, the observer alone can miss it on a parent move.
    window.addEventListener('resize', schedule);
    document.addEventListener('fullscreenchange', schedule);
    render();

    // Called by the deck when the user zooms this plot.
    canvas.__plotZoom = (value) => {
      const next = clamp(Number(value) || 1, 0.1, 4);
      if (Math.abs(next - cam.zoom) < 1e-9) return;
      cam.zoom = next;
      render();
    };
    canvas.__plotZoomValue = () => cam.zoom;
    canvas.__plotRedraw = render;

    // Drag / arrow keys: shift the drawing by a pixel offset, in the same
    // camera space, so panning works at every zoom level.
    canvas.__plotPan = (dx, dy) => {
      const nx = Number(dx) || 0;
      const ny = Number(dy) || 0;
      if (!nx && !ny) return;
      cam.panX += nx;
      cam.panY += ny;
      render();
    };
    canvas.__plotPanReset = () => {
      if (!cam.panX && !cam.panY) return;
      cam.panX = 0;
      cam.panY = 0;
      render();
    };
    canvas.__plotPanValue = () => ({ x: cam.panX, y: cam.panY });

    return {
      redraw: render,
      cam,
      destroy() {
        alive = false;
        observer.disconnect();
        window.removeEventListener('resize', schedule);
        document.removeEventListener('fullscreenchange', schedule);
        cancelAnimationFrame(raf);
        delete canvas.__plotZoom;
        delete canvas.__plotZoomValue;
        delete canvas.__plotRedraw;
        delete canvas.__plotPan;
        delete canvas.__plotPanReset;
        delete canvas.__plotPanValue;
      },
    };
  }

  // Labelled range slider appended to parent.
  function slider(parent, opts) {
    const { label, min, max, step = 1, value, format = com, onInput } = opts;
    const wrap = document.createElement('label');
    wrap.className = 'slider';
    const stepAttr = String(step);
    wrap.innerHTML =
      `<span class="slider-head"><span>${label}</span><output></output></span>` +
      `<input type="range" min="${min}" max="${max}" step="${stepAttr}" value="${value}">`;
    const input = wrap.querySelector('input');
    const out = wrap.querySelector('output');
    parent.appendChild(wrap);

    function sync() {
      out.innerHTML = format(Number(input.value));
    }
    input.addEventListener('input', () => {
      sync();
      if (onInput) onInput(Number(input.value));
    });
    sync();

    return {
      input,
      get value() {
        return Number(input.value);
      },
      set(v) {
        input.value = String(v);
        sync();
        if (onInput) onInput(Number(input.value));
      },
    };
  }

  // Exact cos/sin/tan for whole degrees that are multiples of 30° or 45°.
  const r2 = sqrt('2');
  const r3 = sqrt('3');
  const EXACT = {
    0: { cos: '1', sin: '0', tan: '0' },
    30: { cos: frac(r3, '2'), sin: frac('1', '2'), tan: frac(r3, '3') },
    45: { cos: frac(r2, '2'), sin: frac(r2, '2'), tan: '1' },
    60: { cos: frac('1', '2'), sin: frac(r3, '2'), tan: r3 },
    90: { cos: '0', sin: '1', tan: 'indéfini' },
    120: { cos: `−${frac('1', '2')}`, sin: frac(r3, '2'), tan: `−${r3}` },
    135: { cos: `−${frac(r2, '2')}`, sin: frac(r2, '2'), tan: '−1' },
    150: { cos: `−${frac(r3, '2')}`, sin: frac('1', '2'), tan: `−${frac(r3, '3')}` },
    180: { cos: '−1', sin: '0', tan: '0' },
    210: { cos: `−${frac(r3, '2')}`, sin: `−${frac('1', '2')}`, tan: frac(r3, '3') },
    225: { cos: `−${frac(r2, '2')}`, sin: `−${frac(r2, '2')}`, tan: '1' },
    240: { cos: `−${frac('1', '2')}`, sin: `−${frac(r3, '2')}`, tan: r3 },
    270: { cos: '0', sin: '−1', tan: 'indéfini' },
    300: { cos: frac('1', '2'), sin: `−${frac(r3, '2')}`, tan: `−${r3}` },
    315: { cos: frac(r2, '2'), sin: `−${frac(r2, '2')}`, tan: '−1' },
    330: { cos: frac(r3, '2'), sin: `−${frac('1', '2')}`, tan: `−${frac(r3, '3')}` },
    360: { cos: '1', sin: '0', tan: '0' },
  };

  function exact(deg) {
    const d = ((Math.round(deg) % 360) + 360) % 360;
    return EXACT[d] || null;
  }

  return {
    com,
    frac,
    sqrt,
    poly,
    head,
    randInt,
    pick,
    clamp,
    num,
    close,
    gcd,
    rat,
    textScale,
    fmtPi,
    setupCanvas,
    slider,
    exact,
  };
})();
