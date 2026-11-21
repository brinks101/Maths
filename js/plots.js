// Interactive plots shared by the course chapters.
// G.frame() draws axes and a grid, then hands the chapter a small drawing API.
// Every coordinate goes through the deck's camera, so zoom and pan keep working.
window.G = (function () {
  'use strict';

  const INK = '#f6f1e8';
  const MUTED = 'rgba(246, 241, 232, 0.55)';
  const GRID = 'rgba(246, 241, 232, 0.075)';
  const AXIS = 'rgba(246, 241, 232, 0.34)';
  const ACCENT = '#e3c79e';
  const COS = '#e3c79e';
  const SIN = '#8fcbb6';
  const BLUE = '#7cb0ff';
  const VIOLET = '#b4a8f0';
  const RED = '#e08c7c';
  const GREEN = '#8fc7a6';

  function niceStep(unitsPerPx) {
    const target = unitsPerPx * 78;
    const mag = Math.pow(10, Math.floor(Math.log10(target)));
    const r = target / mag;
    const mult = r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10;
    return mult * mag;
  }

  function decimalsFor(step) {
    if (step >= 1) return 0;
    if (step >= 0.1) return 1;
    if (step >= 0.01) return 2;
    return 3;
  }

  // Base frame: view, grid, axes, sliders and camera-aware helpers.
  function frame(canvas, panel, spec) {
    const state = {};
    (spec.params || []).forEach((param) => {
      state[param.key] = param.value;
    });

    const view = spec.view || { xmin: -6, xmax: 6, ymin: -4, ymax: 4 };
    const showGrid = spec.grid !== false;
    let readout = null;

    function refreshReadout() {
      if (!spec.readout || !panel) return;
      if (!readout) {
        readout = document.createElement('div');
        readout.className = 'readouts';
        panel.appendChild(readout);
      }
      readout.innerHTML = spec.readout(state);
    }

    const env = M.setupCanvas(canvas, (ctx, w, h, cam) => {
      const s =
        Math.min(w / (view.xmax - view.xmin), h / (view.ymax - view.ymin)) * cam.zoom;
      const cx = (view.xmin + view.xmax) / 2;
      const cy = (view.ymin + view.ymax) / 2;
      const ox = w / 2 + cam.panX;
      const oy = h / 2 + cam.panY;
      const map = (x, y) => [ox + (x - cx) * s, oy - (y - cy) * s];
      const fs = M.textScale(w, h, 420);
      const p = {
        ctx,
        w,
        h,
        s,
        map,
        fs,
        state,
        view,
        cam,
        grid: showGrid,
        bounds: {
          xmin: cx - ox / s,
          xmax: cx + (w - ox) / s,
          ymin: cy - (h - oy) / s,
          ymax: cy + oy / s,
        },
      };
      bind(p);
      axes(p);
      if (spec.draw) spec.draw(p);
    });

    (spec.params || []).forEach((param) => {
      if (!panel) return;
      M.slider(panel, {
        label: param.label,
        min: param.min,
        max: param.max,
        step: param.step == null ? 0.1 : param.step,
        value: param.value,
        format:
          param.format ||
          ((v) => M.com(v, param.decimals == null ? 2 : param.decimals)),
        onInput: (v) => {
          state[param.key] = v;
          refreshReadout();
          env.redraw();
        },
      });
    });
    refreshReadout();

    if (spec.caption) {
      const cap = document.createElement('p');
      cap.className = 'canvas-caption';
      cap.innerHTML = spec.caption;
      canvas.parentNode.appendChild(cap);
    }

    return env;
  }

  function axes(p) {
    const { ctx, map, fs } = p;
    const b = p.bounds;
    const step = niceStep(1 / p.s);
    const dec = decimalsFor(step);
    const xAxis = Math.min(Math.max(0, b.ymin), b.ymax);
    const yAxis = Math.min(Math.max(0, b.xmin), b.xmax);
    const [ax, ay] = map(0, 0);

    ctx.save();
    if (p.grid) {
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      for (let k = Math.ceil(b.xmin / step); k * step <= b.xmax; k += 1) {
        const x = k * step;
        const [sx] = map(x, 0);
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, p.h);
        ctx.stroke();
      }
      for (let k = Math.ceil(b.ymin / step); k * step <= b.ymax; k += 1) {
        const y = k * step;
        const [, sy] = map(0, y);
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(p.w, sy);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = AXIS;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, ay);
    ctx.lineTo(p.w, ay);
    ctx.moveTo(ax, 0);
    ctx.lineTo(ax, p.h);
    ctx.stroke();

    ctx.fillStyle = MUTED;
    ctx.font = `${11 * fs}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const labelY = Math.min(Math.max(0, Math.min(p.h - 20, ay + 6)), p.h - 16);
    for (let k = Math.ceil(b.xmin / step); k * step <= b.xmax; k += 1) {
      if (!k) continue;
      const v = k * step;
      const [sx] = map(v, 0);
      if (labelY > p.h - 24) continue;
      ctx.fillText(M.com(v, dec), sx, labelY);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const labelX = Math.max(18, Math.min(p.w - 6, ax - 8));
    for (let k = Math.ceil(b.ymin / step); k * step <= b.ymax; k += 1) {
      if (!k) continue;
      const v = k * step;
      const [, sy] = map(0, v);
      if (labelX < 26) continue;
      ctx.fillText(M.com(v, dec), labelX, sy);
    }
    ctx.fillStyle = 'rgba(246, 241, 232, 0.45)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('O', ax - 6, ay + 6);
    ctx.restore();
  }

  // Drawing helpers attached to the frame object p.
  function bind(p) {
    const { ctx, map, fs, bounds } = p;

    p.line = (x1, y1, x2, y2, o) => {
      const opts = o || {};
      const a = map(x1, y1);
      const b = map(x2, y2);
      ctx.save();
      ctx.strokeStyle = opts.color || INK;
      ctx.lineWidth = opts.width || 2;
      if (opts.dash) ctx.setLineDash(opts.dash);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
      ctx.restore();
    };
    p.seg = p.line;

    p.dot = (x, y, o) => {
      const opts = o || {};
      const [sx, sy] = map(x, y);
      ctx.save();
      ctx.fillStyle = opts.color || INK;
      ctx.beginPath();
      ctx.arc(sx, sy, opts.r || 4.5, 0, Math.PI * 2);
      ctx.fill();
      if (opts.ring) {
        ctx.strokeStyle = opts.ring;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      if (opts.label) {
        ctx.fillStyle = opts.labelColor || opts.color || INK;
        ctx.font = `600 ${(opts.labelSize || 13) * fs}px system-ui, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(opts.label, sx + (opts.dx == null ? 9 : opts.dx), sy + (opts.dy == null ? -10 : opts.dy));
      }
      ctx.restore();
    };

    p.text = (x, y, str, o) => {
      const opts = o || {};
      const [sx, sy] = map(x, y);
      ctx.save();
      ctx.fillStyle = opts.color || INK;
      ctx.font = `${opts.bold ? '600 ' : ''}${(opts.size || 13) * fs}px system-ui, sans-serif`;
      ctx.textAlign = opts.align || 'left';
      ctx.textBaseline = opts.baseline || 'middle';
      ctx.fillText(str, sx + (opts.dx || 0), sy + (opts.dy || 0));
      ctx.restore();
    };

    p.plot = (fn, o) => {
      const opts = o || {};
      const n = opts.samples || Math.max(240, Math.round(p.w));
      const xa = bounds.xmin - (bounds.xmax - bounds.xmin) * 0.02;
      const xb = bounds.xmax + (bounds.xmax - bounds.xmin) * 0.02;
      ctx.save();
      ctx.strokeStyle = opts.color || ACCENT;
      ctx.lineWidth = opts.width || 2.4;
      if (opts.dash) ctx.setLineDash(opts.dash);
      ctx.beginPath();
      let open = false;
      for (let i = 0; i <= n; i += 1) {
        const x = xa + ((xb - xa) * i) / n;
        const y = fn(x, p.state);
        if (!Number.isFinite(y) || Math.abs(y) > 1e6) {
          open = false;
          continue;
        }
        const [sx, sy] = map(x, y);
        if (!open) {
          ctx.moveTo(sx, sy);
          open = true;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    p.area = (fn, a, b, o) => {
      const opts = o || {};
      const n = opts.samples || 240;
      ctx.save();
      ctx.fillStyle = opts.color || 'rgba(227, 199, 158, 0.16)';
      ctx.beginPath();
      const [x0] = map(a, 0);
      const [x1] = map(b, 0);
      const [, y0] = map(0, 0);
      ctx.moveTo(x0, y0);
      for (let i = 0; i <= n; i += 1) {
        const x = a + ((b - a) * i) / n;
        const [, sy] = map(x, fn(x, p.state));
        ctx.lineTo(map(x, 0)[0], sy);
      }
      ctx.lineTo(x1, y0);
      ctx.closePath();
      ctx.fill();
      if (opts.stroke) {
        ctx.strokeStyle = opts.stroke;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
    };

    p.vline = (x, o) => {
      const opts = o || {};
      p.line(x, bounds.ymin, x, bounds.ymax, opts);
      if (opts.label) p.text(x, bounds.ymin, opts.label, { color: opts.color, dy: 14, align: 'center' });
    };

    p.hline = (y, o) => {
      const opts = o || {};
      p.line(bounds.xmin, y, bounds.xmax, y, opts);
    };

    // Tangent at x0, from a numerical derivative (correct to plotting accuracy).
    p.tangent = (fn, x0, o) => {
      const opts = o || {};
      const h = 1e-5;
      const slope = (fn(x0 + h, p.state) - fn(x0 - h, p.state)) / (2 * h);
      const y0 = fn(x0, p.state);
      const half = opts.half || (bounds.xmax - bounds.xmin) * 0.22;
      p.line(x0 - half, y0 - slope * half, x0 + half, y0 + slope * half, {
        color: opts.color || BLUE,
        width: opts.width || 2,
        dash: opts.dash || [7, 5],
      });
      p.dot(x0, y0, { color: opts.color || BLUE, r: opts.r || 4.5, label: opts.label });
      return slope;
    };
  }

  // Convenience: points with optional segments, used for sequences.
  function dots(p, points, o) {
    const opts = o || {};
    points.forEach((pt, i) => {
      if (opts.stems) {
        p.line(pt[0], 0, pt[0], pt[1], {
          color: opts.stemColor || 'rgba(227, 199, 158, 0.3)',
          width: 1.2,
        });
      }
      if (opts.join && i > 0) {
        p.line(points[i - 1][0], points[i - 1][1], pt[0], pt[1], {
          color: opts.joinColor || 'rgba(227, 199, 158, 0.35)',
          width: 1.2,
          dash: [3, 4],
        });
      }
      p.dot(pt[0], pt[1], { color: opts.color || ACCENT, r: opts.r || 4 });
    });
  }

  return {
    frame,
    dots,
    niceStep,
    colors: { INK, MUTED, AXIS, ACCENT, COS, SIN, BLUE, VIOLET, RED, GREEN },
  };
})();
