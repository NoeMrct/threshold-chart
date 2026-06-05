import '../css/index.css';
import { initChart } from './init.js';
import { drawBars } from './bars.js';
import { layoutThresholds, averageInRange } from './thresholds.js';
import { makeInteractive } from './drag.js';

const DEFAULTS = {
  data: [],
  initialMin: 20,
  initialMax: 80,
  showAverage: false,
  minLabelPosition: 'bottom',
  maxLabelPosition: 'bottom',
  avgLabelPosition: 'top',
  spacing: 2,            // minimum gap (in %) kept between the min and max handles
  valueDomain: null,     // [lo, hi] for bar-height mapping; auto-derived when null
  formatLabel: (v) => Math.round(v),
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const applyLabelPosition = (lineEl, labelPos) => {
  const label = lineEl.querySelector('.value-label');
  if (label) {
    label.classList.toggle('label-top', labelPos === 'top');
    label.classList.toggle('label-bottom', labelPos === 'bottom');
  }
  // The knob sits opposite the label so the two never collide.
  lineEl.classList.toggle('handle-top', labelPos === 'bottom');
  lineEl.classList.toggle('handle-bottom', labelPos === 'top');
};

export const createThresholdChart = (selector, options = {}) => {
  const cfg = { ...DEFAULTS, ...options };

  const state = {
    data: Array.isArray(cfg.data) ? cfg.data : [],
    min: clamp(cfg.initialMin, 0, 100),
    max: clamp(cfg.initialMax, 0, 100),
    showAverage: !!cfg.showAverage,
    valueDomain: cfg.valueDomain,
    formatLabel:
      typeof cfg.formatLabel === 'function' ? cfg.formatLabel : DEFAULTS.formatLabel,
  };
  // Enforce ordering at init too (the original only did this while dragging).
  if (state.max < state.min + cfg.spacing) {
    state.max = clamp(state.min + cfg.spacing, 0, 100);
  }

  const el = initChart(selector);

  applyLabelPosition(el.minLine, cfg.minLabelPosition);
  applyLabelPosition(el.maxLine, cfg.maxLabelPosition);
  applyLabelPosition(el.avgLine, cfg.avgLabelPosition);

  // --- rendering split -----------------------------------------------------
  // drawBars: heavy, rebuilds the DOM -> only on init / resize / setData.
  // layout:   cheap, moves lines + toggles classes -> on every change.
  const renderBars = () => drawBars(el, state.data, state.valueDomain);
  const layout = () => layoutThresholds(el, state);

  const getState = () => ({
    min: state.min,
    max: state.max,
    average: state.showAverage ? averageInRange(state.data, state.min, state.max) : null,
  });

  // Single commit path shared by drag, keyboard AND the programmatic API,
  // so clamping, the min/max gap and the callbacks behave identically.
  const commitMin = (pct) => {
    state.min = clamp(Math.min(pct, state.max - cfg.spacing), 0, 100);
    layout();
    options.onMinChange && options.onMinChange(state.min);
    options.onThresholdChange && options.onThresholdChange(getState());
  };
  const commitMax = (pct) => {
    state.max = clamp(Math.max(pct, state.min + cfg.spacing), 0, 100);
    layout();
    options.onMaxChange && options.onMaxChange(state.max);
    options.onThresholdChange && options.onThresholdChange(getState());
  };

  const teardownMin = makeInteractive(el.minLine, el.chart, commitMin);
  const teardownMax = makeInteractive(el.maxLine, el.chart, commitMax);

  // Re-render bars on resize (debounced) since width drives bar geometry.
  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { renderBars(); layout(); }, 100);
  };
  window.addEventListener('resize', onResize);

  renderBars();
  layout();

  return {
    setMin: (v) => commitMin(Number(v)),
    setMax: (v) => commitMax(Number(v)),
    toggleAverage: (b) => { state.showAverage = !!b; layout(); },
    setMinLabelPos: (p) => applyLabelPosition(el.minLine, p),
    setMaxLabelPos: (p) => applyLabelPosition(el.maxLine, p),
    setAvgLabelPos: (p) => applyLabelPosition(el.avgLine, p),
    setData: (d) => { state.data = Array.isArray(d) ? d : []; renderBars(); layout(); },
    getMin: () => state.min,
    getMax: () => state.max,
    getAverage: () =>
      state.showAverage ? averageInRange(state.data, state.min, state.max) : null,
    getState,
    destroy: () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      teardownMin();
      teardownMax();
      el.chart.innerHTML = '';
      el.chart.classList.remove('chart-container');
    },
  };
};
