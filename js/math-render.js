// Render the local KaTeX placeholders. The deck replaces the slide DOM on every
// navigation, so a small observer keeps the formula renderer in sync.
(function () {
  'use strict';

  function render(root) {
    if (!window.katex) return;
    const scope = root || document;
    scope.querySelectorAll('.tex[data-tex]:not([data-tex-done])').forEach((el) => {
      try {
        window.katex.render(el.dataset.tex, el, {
          displayMode: el.dataset.display === '1',
          throwOnError: false,
          strict: 'ignore',
        });
      } catch (err) {
        el.textContent = el.dataset.tex;
      }
      el.dataset.texDone = '1';
    });
  }

  function boot() {
    render(document);
    const stage = document.getElementById('stage');
    if (!stage) return;
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        render(stage);
      });
    });
    observer.observe(stage, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.MathRender = { render };
})();
