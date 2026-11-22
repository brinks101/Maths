// Class page: lists the chapters of one section (?n=premiere|terminale|…).
(function () {
  'use strict';

  if (!window.MATHS_COURS) return;
  const params = new URLSearchParams(location.search);
  const niveau = window.MATHS_COURS.niveau(params.get('n') || 'premiere');

  document.title = `Maths — ${niveau.nom}`;
  document.body.dataset.niveau = niveau.id;
  document.body.style.setProperty('--accent', niveau.accent);
  document.body.style.setProperty('--accent-soft', niveau.accent + '22');

  document.getElementById('level-title').textContent = niveau.nom;
  document.getElementById('level-crumb').textContent = niveau.nom;
  document.getElementById('level-kicker').textContent = niveau.sousTitre;
  document.getElementById('level-resume').textContent = niveau.resume;

  const list = document.getElementById('chapter-list');
  niveau.chapitres.forEach((chapitre, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'chapter-row';
    a.href = `cours.html?n=${encodeURIComponent(niveau.id)}&c=${encodeURIComponent(chapitre.id)}`;
    a.innerHTML =
      `<span class="chapter-num">${String(i + 1).padStart(2, '0')}</span>` +
      `<span class="chapter-name"><strong>${chapitre.titre}</strong><small>${chapitre.resume}</small></span>` +
      `<span class="chapter-go">Ouvrir <span aria-hidden="true">→</span></span>`;
    li.appendChild(a);
    list.appendChild(li);
  });

  // Read the list down the columns, like a book contents page: 1–7 on the
  // left, 8–14 on the right, instead of 1, 2 / 3, 4 across the rows.
  list.style.setProperty('--chapter-rows', String(Math.ceil(niveau.chapitres.length / 2)));
})();
