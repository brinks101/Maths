// Home page: one card per section (or per class), built from the catalogue.
(function () {
  'use strict';

  const grid = document.getElementById('hub-grid');
  if (!grid || !window.MATHS_COURS) return;

  window.MATHS_COURS.niveaux.forEach((niveau, i) => {
    const link = document.createElement('a');
    link.className = 'hub-card';
    link.href = `niveau.html?n=${encodeURIComponent(niveau.id)}`;
    link.style.setProperty('--card-accent', niveau.accent);
    link.innerHTML =
      `<span class="hub-card-num">${String(i + 1).padStart(2, '0')}</span>` +
      `<span class="hub-card-name">${niveau.nom}</span>` +
      `<span class="hub-card-sub">${niveau.sousTitre}</span>` +
      `<span class="hub-card-resume">${niveau.resume}</span>` +
      `<span class="hub-card-foot">${niveau.chapitres.length} chapitres <span aria-hidden="true">→</span></span>`;
    grid.appendChild(link);
  });
})();
