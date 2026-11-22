// Small slide kit: one notion per slide, large formulas, at most one line of
// words, and an optional interactive figure with its own settings card.
// A course slide may also carry labelled blocks (definition, theorem,
// property, method, worked example) so a whole section of the manual fits on
// one screen.
window.MATHS_SLIDES = window.MATHS_SLIDES || [];
window.Kit = (function () {
  'use strict';

  const M = window.M;
  // Display integrals, evaluation brackets and sigmas everywhere.
  const P = (value) => (value == null ? value : M.pretty(String(value)));

  function cblock(kind, tag, body) {
    const parts = [].concat(body).filter((part) => part != null && part !== '').map(P);
    if (!parts.length) return '';
    const html = parts
      .map((part) => {
        const str = String(part).trim();
        return /^<(ul|ol|div|p|table|pre|blockquote|figure)/i.test(str) ? str : `<p>${str}</p>`;
      })
      .join('');
    return `<div class="cblock ${kind}"><p class="cblock-tag">${tag}</p>${html}</div>`;
  }

  function cell(tag, value, className, attrs) {
    return `<${tag}${attrs || ''}${className ? ` class="${className}"` : ''}>${P(value)}</${tag}>`;
  }

  function figure(inner, caption) {
    return (
      `<figure class="table-figure">${inner}` +
      (caption ? `<figcaption class="table-caption">${P(caption)}</figcaption>` : '') +
      `</figure>`
    );
  }

  // Plain data table: generous padding, a real row header, aligned columns.
  function dataTable(spec) {
    const align = spec.align || [];
    const head = spec.head
      .map((h, j) => cell('th', h, 'cell-' + (align[j] || 'center'), ' scope="col"'))
      .join('');
    const rows = spec.rows
      .map(
        (row) =>
          '<tr>' +
          row
            .map((value, j) =>
              j === 0
                ? cell('th', value, 'rowhead', ' scope="row"')
                : cell('td', value, 'cell-' + (align[j] || 'center')),
            )
            .join('') +
          '</tr>',
      )
      .join('');
    const table =
      `<div class="table-wrap plain"><table class="math data-table">` +
      `<thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    return figure(table, spec.caption);
  }

  // Sign table: one column per bound, + / 0 / − in the cells.
  function signTable(spec) {
    const head =
      cell('th', spec.headLabel || 'x', 'rowhead', ' scope="col"') +
      spec.x.map((value) => cell('th', value, 'vbound', ' scope="col"')).join('');
    const rows = spec.rows
      .map((row) => {
        const cells = row.signs
          .map((sign) => {
            const cls =
              sign === '+'
                ? 'vbound sign-pos'
                : sign === '−' || sign === '-'
                  ? 'vbound sign-neg'
                  : sign === '0'
                    ? 'vbound sign-zero'
                    : 'vbound';
            return `<td class="${cls}">${P(sign)}</td>`;
          })
          .join('');
        return `<tr>${cell('th', row.label, 'rowhead', ' scope="row"')}${cells}</tr>`;
      })
      .join('');
    const table =
      `<div class="table-wrap plain vtable-wrap"><table class="math vtable sign-table">` +
      `<thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    return figure(table, spec.caption);
  }

  function arrow(dir) {
    const path =
      dir === 'up'
        ? 'M8 38 L92 6 M78 6 L92 6 L88 20'
        : 'M8 6 L92 38 M78 38 L92 38 L88 24';
    return (
      `<svg class="var-arrow ${dir}" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">` +
      `<path d="${path}" vector-effect="non-scaling-stroke"/></svg>`
    );
  }

  // Variation table: shared x columns, arrows spanning the intervals, values
  // (limits or extrema) on the bounds, derivative signs between them.
  function variationTable(spec) {
    const x = spec.x || [];
    const head =
      cell('th', spec.headLabel || 'x', 'rowhead', ' scope="col"') +
      x
        .map(
          (value, i) =>
            cell('th', value, 'vbound', ' scope="col"') +
            (i < x.length - 1 ? '<th class="vspan" aria-hidden="true"></th>' : ''),
        )
        .join('');
    const rows = spec.rows
      .map((row) => {
        let cells = '';
        x.forEach((_, i) => {
          if (row.values) {
            cells += `<td class="vbound vvalue">${P(row.values[i] == null ? '' : row.values[i])}</td>`;
          } else {
            const zero = row.zeros && row.zeros[i];
            cells += `<td class="vbound vzero">${zero ? '0' : ''}</td>`;
          }
          if (i < x.length - 1) {
            if (row.arrows) {
              cells += `<td class="vspan var-cell">${arrow(row.arrows[i])}</td>`;
            } else if (row.signs) {
              const sign = row.signs[i] == null ? '' : row.signs[i];
              const cls =
                sign === '+'
                  ? 'sign-pos'
                  : sign === '−' || sign === '-'
                    ? 'sign-neg'
                    : sign === '0'
                      ? 'sign-zero'
                      : '';
              cells += `<td class="vspan var-cell ${cls}">${P(sign)}</td>`;
            } else {
              cells += '<td class="vspan var-cell"></td>';
            }
          }
        });
        return `<tr>${cell('th', row.label, 'rowhead', ' scope="row"')}${cells}</tr>`;
      })
      .join('');
    const cols =
      '<colgroup><col class="col-label">' +
      x
        .map(
          (_, i) =>
            '<col class="col-bound">' + (i < x.length - 1 ? '<col class="col-arrow">' : ''),
        )
        .join('') +
      '</colgroup>';
    const table =
      `<div class="table-wrap plain vtable-wrap"><table class="math vtable variation-table">` +
      cols +
      `<thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    return figure(table, spec.caption);
  }

  function table(spec) {
    if (!spec || !spec.rows) return '';
    if (spec.type === 'signs') return signTable(spec);
    if (spec.type === 'variations') return variationTable(spec);
    if (spec.head) return dataTable(spec);
    return '';
  }

  function render(spec) {
    const formulas = spec.formula ? [].concat(spec.formula) : [];
    const blocks = [];
    blocks.push(cblock('def', 'Définition', spec.def));
    blocks.push(cblock('thm', 'Théorème', spec.thm));
    blocks.push(cblock('prop', 'Propriété', spec.prop));
    if (formulas.length) {
      blocks.push(
        `<div class="big-forms">${formulas
          .map((html) => {
            const body = P(html);
            const extra = /class="integral"/.test(body)
              ? ' has-integral'
              : /class="matrix"/.test(body)
                ? ' has-matrix'
                : '';
            return `<div class="formula ${spec.size || 'lg'}${extra}">${body}</div>`;
          })
          .join('')}</div>`,
      );
    }
    if (spec.tab) blocks.push(table(spec.tab));
    if (spec.meth) {
      blocks.push(
        `<div class="cblock meth"><p class="cblock-tag">Méthode</p><ol class="steps">` +
          [].concat(spec.meth).map((it) => `<li>${P(it)}</li>`).join('') +
          `</ol></div>`,
      );
    }
    blocks.push(cblock('ex', 'Exemple', spec.ex));
    blocks.push(cblock('rem', 'Remarque', spec.rem));
    if (spec.main) blocks.push(spec.main);
    if (spec.line) blocks.push(`<p class="say">${P(spec.line)}</p>`);

    const figureHtml = spec.plot
      ? `<figure class="plot-figure"><canvas class="plot"></canvas>` +
        `<div class="card plot-params" aria-label="Réglages de la figure"></div></figure>`
      : '';

    return (
      M.head(spec.kicker || '', spec.title, spec.lead || '') +
      `<div class="slide-body${figureHtml ? ' with-plot' : ''}">` +
      `<div class="slide-text">${blocks.join('')}</div>` +
      figureHtml +
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

  return { slide, render, steps, points, table };
})();
