/**
 * Resolve the [lo, hi] value domain used to map data values to bar heights.
 * If `domain` is a valid [lo, hi] pair it wins; otherwise it is derived from
 * the data (baseline anchored at 0 when all values are positive).
 */
export const computeDomain = (data, domain) => {
  if (Array.isArray(domain) && domain.length === 2) {
    const [lo, hi] = domain;
    if (Number.isFinite(lo) && Number.isFinite(hi) && hi !== lo) return [lo, hi];
  }
  const valid = data.filter(Number.isFinite);
  if (valid.length === 0) return [0, 1];
  let lo = Math.min(...valid);
  let hi = Math.max(...valid);
  if (lo > 0) lo = 0;           // keep a 0 baseline when data is all-positive
  if (hi === lo) hi = lo + 1;   // avoid divide-by-zero on flat data
  return [lo, hi];
};

/**
 * (Re)draw every bar. This is the only heavy operation, so it runs once on
 * init and again only when the size (resize) or the data set changes — never
 * on every drag frame.
 */
export const drawBars = (oElems, data, domain) => {
  const barsEl = oElems.barsEl;
  barsEl.innerHTML = '';
  barsEl.className = 'bars spikes';

  const count = data.length;
  if (count === 0) return;

  const { clientWidth: width, clientHeight: height } = barsEl;
  const [lo, hi] = computeDomain(data, domain);
  const span = hi - lo;

  const slot     = width / count;
  const margin   = Math.max(0, Math.min(2, slot * 0.2)); // shrink gap when crowded
  const barWidth = Math.max(1, slot - margin * 2);       // never collapse to 0

  const frag = document.createDocumentFragment();
  data.forEach((value) => {
    const v = Number.isFinite(value) ? value : lo;
    const ratio = Math.max(0, Math.min(1, (v - lo) / span));
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.setProperty('--bar-width', `${barWidth}px`);
    bar.style.setProperty('--bar-height', `${ratio * height}px`);
    bar.style.margin = `0 ${margin}px`;
    frag.appendChild(bar);
  });
  barsEl.appendChild(frag);
};
