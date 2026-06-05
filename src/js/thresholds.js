/**
 * Arithmetic mean of the data values whose bars fall inside the [minPct, maxPct]
 * window. Returns null when no bar is in range. This is the REAL average shown
 * by the avg threshold (not the geometric midpoint of the two handles).
 */
export const averageInRange = (data, minPct, maxPct) => {
  const count = data.length;
  if (count === 0) return null;
  const startIdx = Math.floor((minPct / 100) * count);
  const endIdx   = Math.floor((maxPct / 100) * count);
  let sum = 0, n = 0;
  for (let i = startIdx; i <= endIdx && i < count; i++) {
    const v = data[i];
    if (Number.isFinite(v)) { sum += v; n++; }
  }
  return n === 0 ? null : sum / n;
};

const highlightBars = (barsEl, minPct, maxPct) => {
  const bars = barsEl.children;
  const count = bars.length;
  if (count === 0) return;
  const startIdx = Math.floor((minPct / 100) * count);
  const endIdx   = Math.floor((maxPct / 100) * count);
  for (let i = 0; i < count; i++) {
    const inRange = i >= startIdx && i <= endIdx;
    bars[i].classList.toggle('bar--in-range', inRange);
    bars[i].classList.toggle('bar--out-of-range', !inRange);
  }
};

/**
 * Cheap layout pass: position the three lines, refresh labels + ARIA, and
 * re-highlight the bars. Runs on every drag / keyboard step.
 */
export const layoutThresholds = (oElems, state) => {
  const { min, max, showAverage, data, formatLabel } = state;
  const mid = (min + max) / 2;
  const avgValue = showAverage ? averageInRange(data, min, max) : null;

  const place = (el, pct, kind, labelValue) => {
    el.style.left = `${pct}%`;
    const lbl = el.querySelector('.value-label');
    if (lbl) lbl.textContent = labelValue == null ? '' : formatLabel(labelValue, kind);
    if (kind === 'min' || kind === 'max') {
      el.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
  };

  place(oElems.minLine, min, 'min', min);
  place(oElems.maxLine, max, 'max', max);

  // The avg line sits at the horizontal centre of the selection; its label
  // displays the real mean of the in-range values.
  oElems.avgLine.style.display = showAverage ? '' : 'none';
  if (showAverage) {
    place(oElems.avgLine, mid, 'avg', avgValue);
    oElems.avgLine.setAttribute(
      'aria-label',
      avgValue == null ? 'average value' : `average value ${formatLabel(avgValue, 'avg')}`
    );
  }

  highlightBars(oElems.barsEl, min, max);
};
