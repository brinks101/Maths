// Slide deck engine: reads window.MATHS_SLIDES, rendered one at a time.
// The class (Première, Terminale, Expertes, Automatismes) comes from ?n=...
window.MATHS_SLIDES = window.MATHS_SLIDES || [];

(function () {
  'use strict';

  const CATALOGUE = window.MATHS_COURS;
  const params = new URLSearchParams(location.search);
  const NIVEAU = CATALOGUE
    ? CATALOGUE.niveau(params.get('n') || 'premiere')
    : { id: 'premiere', nom: 'Première Spé', chapitres: [] };
  const CHAPITRES = (NIVEAU.chapitres || []).filter((c) =>
    window.MATHS_SLIDES.some((s) => s.chapter === c.id),
  );
  const $ = (sel, root) => (root || document).querySelector(sel);

  let slides = [];
  let index = 0;
  let cleanup = null;
  let toastTimer = 0;
  let touchX = null;

  let stageEl;
  let slideEl;
  let counterEl;
  let progressEl;
  let menuEl;
  let groupsEl;
  let prevBtn;
  let nextBtn;
  let toastEl;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1900);
  }

  function go(target) {
    if (!slides.length) return;
    exitGraphFocus();
    if (typeof target === 'string') {
      const byId = slides.findIndex((s) => s.id === target);
      if (byId < 0) return;
      target = byId;
    }
    index = Math.max(0, Math.min(slides.length - 1, Number(target) || 0));

    if (typeof cleanup === 'function') {
      try {
        cleanup();
      } catch (err) {
        console.error(err);
      }
    }
    cleanup = null;

    const slide = slides[index];
    document.body.dataset.chapter = slide.chapter;
    slideEl.innerHTML = '';
    slideEl.classList.remove('in');

    try {
      const result = slide.build(slideEl);
      if (typeof result === 'function') cleanup = result;
    } catch (err) {
      console.error(err);
      slideEl.innerHTML =
        `<div class="card"><h3 class="card-title">Erreur dans cette diapo</h3>` +
        `<pre class="error">${String((err && err.message) || err)}</pre></div>`;
    }

    enhancePlots(slideEl);
    requestAnimationFrame(() => slideEl.classList.add('in'));

    counterEl.textContent = `${index + 1} / ${slides.length}`;
    progressEl.style.width = `${((index + 1) / slides.length) * 100}%`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;

    document.querySelectorAll('#chapters .chip').forEach((b) => {
      b.classList.toggle('active', b.dataset.chapter === slide.chapter);
    });
    document.querySelectorAll('#menu-groups button').forEach((b) => {
      b.classList.toggle('active', b.dataset.index === String(index));
    });

    history.replaceState(null, '', '#' + slide.id);
    stageEl.scrollTop = 0;
    closeMenu();

    const active = document.activeElement;
    if (active && active !== document.body && typeof active.blur === 'function') active.blur();
  }

  // Sommaire of the current class only: one group per chapter, slides numbered
  // inside their chapter.
  function buildMenu() {
    groupsEl.innerHTML = '';
    CHAPITRES.forEach((chapitre) => {
      const group = document.createElement('div');
      group.className = 'menu-group';
      const title = document.createElement('h3');
      title.textContent = chapitre.titre;
      group.appendChild(title);
      let count = 0;
      slides.forEach((slide, i) => {
        if (slide.chapter !== chapitre.id) return;
        count += 1;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.index = String(i);
        button.innerHTML =
          `<span class="menu-num">${String(count).padStart(2, '0')}</span>` +
          `<span>${slide.title}</span>`;
        button.addEventListener('click', () => go(i));
        group.appendChild(button);
      });
      groupsEl.appendChild(group);
    });
  }

  function openMenu() {
    buildMenu();
    document.querySelectorAll('#menu-groups button').forEach((b) => {
      b.classList.toggle('active', b.dataset.index === String(index));
    });
    menuEl.hidden = false;
    $('#menu-btn').setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menuEl || menuEl.hidden) return;
    menuEl.hidden = true;
    $('#menu-btn').setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (menuEl.hidden) openMenu();
    else closeMenu();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const request = document.documentElement.requestFullscreen;
      if (request) {
        const result = request.call(document.documentElement);
        if (result && result.catch) result.catch(() => toast('Plein écran refusé par le navigateur'));
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  let focusedPlot = null;
  let zoomStage = null;
  let zoomLevel = 1;
  let focusLayer = null;

  // Discrete zoom steps: walking through fixed levels (10 %, 25 %, 50 %,
  // 75 %, 100 %, 125 % …) is easier to reason about than free multiplication.
  const ZOOM_STEPS = [10, 25, 50, 75, 100, 125, 150, 200, 250, 300, 400];

  function zoomLabel() {
    return zoomStage ? zoomStage.parentElement.querySelector('.plot-zoom-value') : null;
  }

  function zoomIndex() {
    const pct = Math.round(zoomLevel * 100);
    let best = 0;
    ZOOM_STEPS.forEach((step, i) => {
      if (Math.abs(step - pct) < Math.abs(ZOOM_STEPS[best] - pct)) best = i;
    });
    return best;
  }

  function stepZoom(dir) {
    if (!zoomStage) return;
    const next = ZOOM_STEPS[zoomIndex() + dir];
    if (next == null) return;
    applyZoom(next / 100);
  }

  // Fullscreen shows the plot alone, plus the card(s) holding its sliders and
  // the blocks marked [data-focus-panel] (an equation and its interval): the
  // rest of the slide stays out of the way.
  function collectControlCards(frame) {
    const cards = [];
    slideEl.querySelectorAll('.card, [data-focus-panel]').forEach((card) => {
      if (card.contains(frame) || frame.contains(card)) return;
      if (!card.hasAttribute('data-focus-panel') && !card.querySelector('input[type="range"], .presets')) {
        return;
      }
      cards.push(card);
    });
    return cards;
  }

  function openFocusLayer(frame) {
    const layer = document.createElement('div');
    layer.className = 'graph-layer';
    const main = document.createElement('div');
    main.className = 'graph-layer-main';
    const side = document.createElement('aside');
    side.className = 'graph-layer-side';
    side.setAttribute('aria-label', 'Réglages du graphique');
    layer.append(main, side);

    const homes = [];
    const move = (node, parent) => {
      homes.push({ node, parent: node.parentNode, next: node.nextSibling });
      parent.appendChild(node);
    };

    move(frame, main);
    collectControlCards(frame).forEach((card) => move(card, side));
    if (!side.childElementCount) {
      side.remove();
      layer.classList.add('no-side');
    }

    document.body.appendChild(layer);
    focusLayer = { layer, homes };

    // The plot just changed parent and size: repaint once the layout settles.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        layer.querySelectorAll('canvas').forEach((canvas) => {
          if (typeof canvas.__plotRedraw === 'function') canvas.__plotRedraw();
        });
      }),
    );
  }

  function closeFocusLayer() {
    if (!focusLayer) return;
    const { layer, homes } = focusLayer;
    focusLayer = null;
    for (let i = homes.length - 1; i >= 0; i -= 1) {
      const home = homes[i];
      if (!home.parent) continue;
      home.parent.insertBefore(home.node, home.next && home.next.parentNode === home.parent ? home.next : null);
    }
    layer.remove();
  }

  // Zoom is a camera move inside the plot: the drawing magnifies (or shrinks)
  // around its focus point, so fewer units stay visible and the grid is
  // recomputed. The canvas keeps its size, so strokes and labels stay sharp.
  function applyZoom(next) {
    if (!zoomStage) return;
    const canvas = zoomStage.querySelector('canvas');
    const z = Math.min(4, Math.max(0.1, Math.round(next * 100) / 100));
    if (!canvas || z === zoomLevel || typeof canvas.__plotZoom !== 'function') return;
    canvas.__plotZoom(z);
    zoomLevel = z;
    const label = zoomLabel();
    if (label) label.textContent = `${Math.round(z * 100)} %`;
  }

  function resetZoom() {
    if (!zoomStage) return;
    const canvas = zoomStage.querySelector('canvas');
    if (canvas && typeof canvas.__plotZoom === 'function') canvas.__plotZoom(1);
    if (canvas && typeof canvas.__plotPanReset === 'function') canvas.__plotPanReset();
    zoomLevel = 1;
    const label = zoomLabel();
    if (label) label.textContent = '100 %';
  }

  function clearGraphFocus() {
    if (!focusedPlot) return;
    closeFocusLayer();
    const frame = focusedPlot.closest('.plot-frame');
    focusedPlot.classList.remove('plot-focused');
    focusedPlot.removeAttribute('aria-pressed');
    if (frame) {
      frame.classList.remove('focus');
      const button = frame.querySelector('.plot-btn');
      if (button) {
        button.innerHTML = '⤢ Agrandir';
        button.setAttribute('aria-pressed', 'false');
      }
    }
    resetZoom();
    zoomStage = null;
    document.body.classList.remove('graph-focus');
    focusedPlot = null;
  }

  function exitGraphFocus() {
    const wasFocused = Boolean(focusedPlot);
    clearGraphFocus();
    if (wasFocused && document.fullscreenElement && document.exitFullscreen) {
      const result = document.exitFullscreen();
      if (result && result.catch) result.catch(() => {});
    }
  }

  function togglePlot(canvas, button) {
    if (focusedPlot === canvas) {
      exitGraphFocus();
      return;
    }
    exitGraphFocus();
    const frame = canvas.closest('.plot-frame');
    if (!frame) return;

    focusedPlot = canvas;
    frame.classList.add('focus');
    canvas.classList.add('plot-focused');
    canvas.setAttribute('aria-pressed', 'true');
    button.innerHTML = 'Réduire ✕';
    button.setAttribute('aria-pressed', 'true');
    document.body.classList.add('graph-focus');
    zoomStage = frame.querySelector('.plot-stage');
    zoomLevel = 1;

    // Only the graph and its parameter card go fullscreen.
    openFocusLayer(frame);

    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      try {
        const result = document.documentElement.requestFullscreen();
        if (result && result.catch) result.catch(() => {});
      } catch (err) {
        /* Fullscreen can be blocked (no gesture, embedded page): overlay still works. */
      }
    }
  }

  // Wrap every plot in a frame with an “enlarge” button and a zoom control.
  function enhancePlots(root) {
    root.querySelectorAll('canvas.plot').forEach((canvas) => {
      if (canvas.dataset.plotReady) return;
      canvas.dataset.plotReady = '1';
      const frame = document.createElement('div');
      frame.className = 'plot-frame';
      canvas.parentNode.insertBefore(frame, canvas);
      const stage = document.createElement('div');
      stage.className = 'plot-stage';
      frame.appendChild(stage);
      stage.appendChild(canvas);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'plot-btn';
      button.setAttribute('aria-label', 'Agrandir le graphique en plein écran');
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = '⤢ Agrandir';
      button.addEventListener('click', () => togglePlot(canvas, button));
      frame.appendChild(button);

      const bar = document.createElement('div');
      bar.className = 'plot-zoom';
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', 'Zoom du graphique');
      bar.setAttribute('title', 'Molette ou − / + pour zoomer · glisser pour déplacer');
      bar.innerHTML =
        '<button type="button" class="plot-zoom-btn" data-zoom="out" aria-label="Dézoomer">−</button>' +
        '<span class="plot-zoom-value" aria-live="polite">100 %</span>' +
        '<button type="button" class="plot-zoom-btn" data-zoom="in" aria-label="Zoomer">+</button>' +
        '<button type="button" class="plot-zoom-btn" data-zoom="reset" aria-label="Taille d’origine">↺</button>';
      frame.appendChild(bar);
      bar.addEventListener('click', (event) => {
        const action = event.target.closest('[data-zoom]');
        if (!action) return;
        if (action.dataset.zoom === 'in') stepZoom(1);
        else if (action.dataset.zoom === 'out') stepZoom(-1);
        else resetZoom();
      });

      stage.addEventListener(
        'wheel',
        (event) => {
          if (!document.body.classList.contains('graph-focus')) return;
          event.preventDefault();
          stepZoom(event.deltaY < 0 ? 1 : -1);
        },
        { passive: false },
      );

      // Drag to move the graph. Only in fullscreen: outside, dragging the
      // circle belongs to the slide (it picks an angle).
      let panning = null;
      canvas.addEventListener('pointerdown', (event) => {
        if (!document.body.classList.contains('graph-focus')) return;
        if (event.button != null && event.button !== 0) return;
        panning = { id: event.pointerId, x: event.clientX, y: event.clientY };
        try {
          if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
        } catch (err) {
          /* synthetic pointer or unsupported browser */
        }
        event.preventDefault();
      });
      canvas.addEventListener('pointermove', (event) => {
        if (!panning || event.pointerId !== panning.id) return;
        const dx = event.clientX - panning.x;
        const dy = event.clientY - panning.y;
        panning.x = event.clientX;
        panning.y = event.clientY;
        if (typeof canvas.__plotPan === 'function') canvas.__plotPan(dx, dy);
      });
      ['pointerup', 'pointercancel'].forEach((type) => {
        canvas.addEventListener(type, () => {
          panning = null;
        });
      });
    });
  }

  function init() {
    // Catalogue order first, then the order the chapter file declares its slides.
    slides = [];
    CHAPITRES.forEach((chapitre) => {
      window.MATHS_SLIDES.forEach((slide) => {
        if (slide.chapter === chapitre.id) slides.push(slide);
      });
    });
    stageEl = $('#stage');
    slideEl = $('#slide');
    counterEl = $('#counter');
    progressEl = $('#progress');
    menuEl = $('#menu');
    groupsEl = $('#menu-groups');
    prevBtn = $('#prev');
    nextBtn = $('#next');
    toastEl = $('#toast');

    document.body.dataset.niveau = NIVEAU.id;
    document.title = `Maths — ${NIVEAU.nom}`;
    const levelName = $('#level-name');
    if (levelName) levelName.textContent = NIVEAU.nom;
    const menuTitle = $('#menu-title');
    if (menuTitle) menuTitle.textContent = `Sommaire · ${NIVEAU.nom}`;
    const foot = $('#foot-level');
    if (foot) foot.textContent = NIVEAU.nom;

    window.M.toast = toast;
    window.Deck = {
      go,
      next: () => go(index + 1),
      prev: () => go(index - 1),
    };

    if (!slides.length) {
      slideEl.innerHTML = '<div class="card">Aucune diapo chargée pour cette classe.</div>';
      return;
    }

    const chaptersEl = $('#chapters');
    CHAPITRES.forEach((chapitre) => {
      const first = slides.findIndex((s) => s.chapter === chapitre.id);
      if (first < 0) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip';
      button.dataset.chapter = chapitre.id;
      button.title = chapitre.titre;
      button.innerHTML = `<span class="dot"></span>${chapitre.titre}`;
      button.addEventListener('click', () => go(first));
      chaptersEl.appendChild(button);
    });

    prevBtn.addEventListener('click', () => go(index - 1));
    nextBtn.addEventListener('click', () => go(index + 1));
    $('#menu-btn').addEventListener('click', toggleMenu);
    $('#menu-close').addEventListener('click', closeMenu);
    menuEl.addEventListener('click', (event) => {
      if (event.target === menuEl) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      // The note board (N) owns the keyboard while it is open.
      if (document.body.classList.contains('note-open')) return;
      const target = event.target;
      const tag = ((target && target.tagName) || '').toLowerCase();
      const typing =
        tag === 'input' || tag === 'textarea' || tag === 'select' || (target && target.isContentEditable);

      if (event.key === 'Escape') {
        if (focusedPlot) {
          exitGraphFocus();
          return;
        }
        closeMenu();
        return;
      }
      if (focusedPlot && !typing && /^Arrow(Left|Right|Up|Down)$/.test(event.key)) {
        event.preventDefault();
        const canvas = focusedPlot;
        const step = 48;
        const dx = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
        const dy = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
        if (typeof canvas.__plotPan === 'function') canvas.__plotPan(dx, dy);
        return;
      }
      if (focusedPlot && !typing && (event.key === '+' || event.key === '=' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
        if (event.key === '0') resetZoom();
        else stepZoom(event.key === '-' ? -1 : 1);
        return;
      }
      if (typing) return;
      if (tag === 'button' && (event.key === ' ' || event.key === 'Enter')) return;

      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        go(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        go(slides.length - 1);
      } else if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        toggleMenu();
      } else if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        toggleFullscreen();
      }
    });

    stageEl.addEventListener(
      'touchstart',
      (event) => {
        if (event.target.closest('canvas, input, .no-swipe')) {
          touchX = null;
          return;
        }
        touchX = event.touches[0] ? event.touches[0].clientX : null;
      },
      { passive: true },
    );
    stageEl.addEventListener(
      'touchend',
      (event) => {
        if (touchX == null || !event.changedTouches[0]) return;
        const dx = event.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 70) go(index + (dx < 0 ? 1 : -1));
      },
      { passive: true },
    );

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) clearGraphFocus();
    });

    const fromHash = decodeURIComponent(location.hash.replace(/^#/, ''));
    let start = slides.findIndex((s) => s.id === fromHash);
    if (start < 0 && fromHash) {
      const chapter = CHAPITRES.find((c) => c.id === fromHash);
      if (chapter) start = slides.findIndex((s) => s.chapter === chapter.id);
    }
    go(start >= 0 ? start : 0);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
