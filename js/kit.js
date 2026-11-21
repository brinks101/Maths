// Small slide kit: one notion per slide, large formulas, at most one line of
// words, and an optional interactive figure with its own settings card.
window.Kit = (function () {
  'use strict';

  const M = window.M;

  function render(spec) {
    const formulas = spec.formula ? [].concat(spec.formula) : [];
    const blocks = [];
    if (formulas.length) {
      blocks.push(
        `<div class="big-forms">${formulas
          .map((html) => `<div class="formula ${spec.size || 'xl'}">${html}</div>`)
          .join('')}</div>`,
      );
    }
    if (spec.main) blocks.push(spec.main);
    if (spec.line) blocks.push(`<p class="say">${spec.line}</p>`);

    const figure = spec.plot
      ? `<figure class="plot-figure"><canvas class="plot"></canvas>` +
        `<div class="card plot-params" aria-label="Réglages de la figure"></div></figure>`
      : '';

    return (
      M.head(spec.kicker || '', spec.title, spec.lead || '') +
      `<div class="slide-body${figure ? ' with-plot' : ''}">` +
      `<div class="slide-text">${blocks.join('')}</div>` +
      figure +
      `</div>`
    );
  }

  function slide(chapter, spec) {
    window.MATHS_SLIDES.push({
      id: spec.id,
      chapter,
      title: spec.title,
      build(el) {
        let cleanup = typeof spec.build === 'function' ? spec.build(el) : null;
        if (!cleanup) {
          el.innerHTML = render(spec);
          if (spec.plot) {
            const canvas = el.querySelector('canvas.plot');
            const panel = el.querySelector('.plot-params');
            const result = spec.plot(canvas, panel);
            if (result && typeof result.destroy === 'function') {
              cleanup = () => result.destroy();
            }
          }
          if (spec.after) spec.after(el);
        }
        return cleanup;
      },
    });
  }

  // Numbered method, one line per step, displayed small under the formula.
  function steps(title, items) {
    return (
      `<div class="card mini-card"><h4 class="card-title">${title}</h4><ol class="steps">` +
      items.map((it) => `<li>${it}</li>`).join('') +
      `</ol></div>`
    );
  }

  // Two or three short reminders, side by side.
  function points(items) {
    return (
      `<ul class="points">` +
      items.map((it) => `<li>${it}</li>`).join('') +
      `</ul>`
    );
  }

  function table(head, rows) {
    return (
      `<div class="table-wrap"><table><thead><tr>` +
      head.map((h) => `<th>${h}</th>`).join('') +
      `</tr></thead><tbody>` +
      rows
        .map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`)
        .join('') +
      `</tbody></table></div>`
    );
  }

  return { slide, render, steps, points, table };
})();
