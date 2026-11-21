// Note board: N opens a blank page to write on, with a free camera.
// Strokes are kept in "world" coordinates, so zooming and panning keep the
// handwriting intact and give as much room as needed.
(function () {
  'use strict';

  const MIN_ZOOM = 0.2;
  const MAX_ZOOM = 10;
  const PAGE = '#fffdf8';
  const BLACK = '#141110';
  const RED = '#c62828';

  const state = {
    open: false,
    color: BLACK,
    width: 4,
    tool: 'pen',
    zoom: 1,
    x: 0,
    y: 0,
    strokes: [],
    draft: null,
    panning: null,
    dpr: 1,
  };

  let layer = null;
  let canvas = null;
  let ctx = null;
  let zoomValue = null;
  let sizeValue = null;
  let sizeInput = null;
  let observer = null;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  function build() {
    if (layer) return;
    layer = document.createElement('div');
    layer.className = 'note-layer';
    layer.hidden = true;
    layer.innerHTML =
      `<div class="note-bar">` +
      `<div class="note-group">` +
      `<button type="button" class="note-btn note-color" data-color="${BLACK}" style="--swatch:${BLACK}"><span class="note-swatch"></span>Noir</button>` +
      `<button type="button" class="note-btn note-color" data-color="${RED}" style="--swatch:${RED}"><span class="note-swatch"></span>Rouge</button>` +
      `<label class="note-size">Taille <input type="range" min="1" max="16" step="1" value="${state.width}" aria-label="Taille du trait"><output class="note-size-value">${state.width}</output></label>` +
      `<button type="button" class="note-btn note-tool" data-tool="pen">✎ Stylo</button>` +
      `<button type="button" class="note-btn note-tool" data-tool="eraser">⌫ Gomme</button>` +
      `<button type="button" class="note-btn note-tool" data-tool="pan">✋ Déplacer</button>` +
      `</div>` +
      `<div class="note-group">` +
      `<button type="button" class="note-btn" data-zoom="out" aria-label="Dézoomer">−</button>` +
      `<span class="note-zoom-value">100 %</span>` +
      `<button type="button" class="note-btn" data-zoom="in" aria-label="Zoomer">+</button>` +
      `<button type="button" class="note-btn" data-zoom="reset">Recentrer</button>` +
      `<button type="button" class="note-btn" data-clear="1">Tout effacer</button>` +
      `<button type="button" class="note-btn note-close" data-close="1">Fermer <kbd>N</kbd></button>` +
      `</div>` +
      `</div>` +
      `<canvas class="note-canvas" aria-label="Page de notes"></canvas>`;
    document.body.appendChild(layer);

    canvas = layer.querySelector('.note-canvas');
    ctx = canvas.getContext('2d');
    zoomValue = layer.querySelector('.note-zoom-value');
    sizeInput = layer.querySelector('input[type="range"]');
    sizeValue = layer.querySelector('.note-size-value');

    layer.querySelectorAll('.note-color').forEach((button) => {
      button.addEventListener('click', () => setColor(button.dataset.color));
    });
    layer.querySelectorAll('.note-tool').forEach((button) => {
      button.addEventListener('click', () => setTool(button.dataset.tool));
    });
    layer.querySelector('.note-close').addEventListener('click', close);

    layer.querySelector('[data-clear]').addEventListener('click', () => {
      state.strokes = [];
      state.draft = null;
      render();
    });
    layer.querySelectorAll('[data-zoom]').forEach((button) => {
      button.addEventListener('click', () => {
        const rect = canvas.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const action = button.dataset.zoom;
        if (action === 'in') zoomAt(cx, cy, 1.25);
        else if (action === 'out') zoomAt(cx, cy, 0.8);
        else resetView();
      });
    });

    sizeInput.addEventListener('input', () => {
      state.width = Number(sizeInput.value);
      sizeValue.textContent = String(state.width);
    });

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    canvas.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.0016));
      },
      { passive: false },
    );

    observer = new ResizeObserver(() => resize());
    observer.observe(canvas);
    setTool('pen');
    setColor(BLACK);
  }

  function setColor(color) {
    state.color = color;
    if (layer) {
      layer.querySelectorAll('.note-color').forEach((button) => {
        button.classList.toggle('active', button.dataset.color === color);
      });
    }
    // Picking a colour means going back to the pen.
    if (state.tool === 'eraser') setTool('pen');
  }

  function setTool(tool) {
    state.tool = tool;
    if (!layer) return;
    layer.querySelectorAll('.note-tool').forEach((button) => {
      button.classList.toggle('active', button.dataset.tool === tool);
    });
    canvas.classList.toggle('is-eraser', tool === 'eraser');
    canvas.classList.toggle('is-pan', tool === 'pan');
  }

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    state.dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * state.dpr);
    canvas.height = Math.round(h * state.dpr);
    render();
  }

  function paint(stroke) {
    ctx.save();
    ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    const pts = stroke.points;
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, stroke.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function render() {
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = PAGE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(
      state.dpr * state.zoom,
      0,
      0,
      state.dpr * state.zoom,
      state.dpr * state.x,
      state.dpr * state.y,
    );
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    state.strokes.forEach(paint);
    if (state.draft) paint(state.draft);
  }

  function syncZoom() {
    if (zoomValue) zoomValue.textContent = `${Math.round(state.zoom * 100)} %`;
  }

  function resetView() {
    state.zoom = 1;
    state.x = 0;
    state.y = 0;
    syncZoom();
    render();
  }

  // Zoom around the pointer: the point under the finger stays put.
  function zoomAt(clientX, clientY, factor) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    const next = clamp(state.zoom * factor, MIN_ZOOM, MAX_ZOOM);
    if (Math.abs(next - state.zoom) < 1e-4) return;
    const k = next / state.zoom;
    state.x = sx - (sx - state.x) * k;
    state.y = sy - (sy - state.y) * k;
    state.zoom = next;
    syncZoom();
    render();
  }

  function pointOf(event) {
    const rect = canvas.getBoundingClientRect();
    const sx = event.clientX - rect.left;
    const sy = event.clientY - rect.top;
    return { x: (sx - state.x) / state.zoom, y: (sy - state.y) / state.zoom };
  }

  function onDown(event) {
    if (event.button != null && event.button !== 0 && event.button !== 1) return;
    event.preventDefault();
    try {
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
    } catch (err) {
      /* synthetic pointer or unsupported browser */
    }
    if (event.button === 1 || state.tool === 'pan') {
      state.panning = { id: event.pointerId, x: event.clientX, y: event.clientY };
      return;
    }
    state.draft = {
      color: state.color,
      width: state.tool === 'eraser' ? state.width * 2.6 : state.width,
      erase: state.tool === 'eraser',
      points: [pointOf(event)],
    };
    render();
  }

  function onMove(event) {
    if (state.panning && state.panning.id === event.pointerId) {
      state.x += event.clientX - state.panning.x;
      state.y += event.clientY - state.panning.y;
      state.panning.x = event.clientX;
      state.panning.y = event.clientY;
      render();
      return;
    }
    if (!state.draft) return;
    const p = pointOf(event);
    const pts = state.draft.points;
    const last = pts[pts.length - 1];
    // One point every ~1 px on screen: enough for smooth curves, cheap to replay.
    if (Math.hypot(p.x - last.x, p.y - last.y) * state.zoom < 1.1) return;
    pts.push(p);
    render();
  }

  function onUp(event) {
    if (state.panning && state.panning.id === event.pointerId) {
      state.panning = null;
      return;
    }
    if (!state.draft) return;
    if (state.draft.points.length) state.strokes.push(state.draft);
    state.draft = null;
    render();
  }

  function undo() {
    // While drawing, the "last action" is the current stroke.
    if (state.draft) {
      state.draft = null;
      render();
      return;
    }
    if (!state.strokes.length) return;
    state.strokes.pop();
    render();
  }

  function open() {
    build();
    if (state.open) return;
    state.open = true;
    layer.hidden = false;
    document.body.classList.add('note-open');
    resize();
    syncZoom();
  }

  function close() {
    if (!state.open) return;
    state.open = false;
    state.draft = null;
    state.panning = null;
    const active = document.activeElement;
    if (active && layer.contains(active) && typeof active.blur === 'function') active.blur();
    layer.hidden = true;
    document.body.classList.remove('note-open');
  }

  function onKeyDown(event) {
    const target = event.target;
    const tag = ((target && target.tagName) || '').toLowerCase();
    const typing =
      tag === 'input' || tag === 'textarea' || tag === 'select' || (target && target.isContentEditable);

    if (!state.open) {
      if (!typing && !event.ctrlKey && !event.metaKey && !event.altKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        open();
      }
      return;
    }

    if (event.key === 'Escape' || event.key.toLowerCase() === 'n') {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    }
    if (typing) return;

    // Ctrl/Cmd+Z removes the last stroke, one at a time.
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      event.stopPropagation();
      undo();
      return;
    }

    // The deck must not navigate while the blank page is open.
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'm', 'M', 'f', 'F', '+', '-', '=', '0'].includes(event.key)) {
      event.preventDefault();
    }
    event.stopPropagation();
  }

  document.addEventListener('keydown', onKeyDown, true);
})();
