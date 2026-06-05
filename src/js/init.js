/**
 * Build the chart DOM inside the host element and return references to it.
 * Accepts either a CSS selector or an HTMLElement.
 */
const thresholdMarkup = (kind) => {
  const interactive = kind === 'min' || kind === 'max';
  const attrs = interactive
    ? ` role="slider" tabindex="0" aria-orientation="horizontal"` +
      ` aria-valuemin="0" aria-valuemax="100" aria-label="${kind} threshold"`
    : ` role="img" aria-label="average value"`;
  return `<div class="threshold ${kind}"${attrs}><div class="value-label"></div></div>`;
};

export const initChart = (selector) => {
  const chartEl =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!chartEl) throw new Error(`threshold-chart: container not found: ${selector}`);

  chartEl.classList.add('chart-container');
  chartEl.innerHTML =
    '<div class="bars"></div>' +
    thresholdMarkup('min') +
    thresholdMarkup('max') +
    thresholdMarkup('avg');

  return {
    chart:   chartEl,
    barsEl:  chartEl.querySelector('.bars'),
    minLine: chartEl.querySelector('.threshold.min'),
    maxLine: chartEl.querySelector('.threshold.max'),
    avgLine: chartEl.querySelector('.threshold.avg'),
  };
};
