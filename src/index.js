import './style.css';

export function createThresholdChart(containerSelector, {
  data = [],               // tableau de valeurs 0–100
  initialMin = 20,
  initialMax = 80,
  showAverage = false,
  style = 'spikes'         // 'spikes' ou 'smooth'
} = {}) {
  const chart = document.querySelector(containerSelector);
  if (!chart) throw new Error(`Container introuvable : ${containerSelector}`);

  // Insère le HTML
  chart.classList.add('chart-container');
  chart.innerHTML = `
    <div class="bars"></div>
    <div class="threshold min"><div class="value-label"></div></div>
    <div class="threshold max"><div class="value-label"></div></div>
    <div class="threshold avg"><div class="value-label"></div></div>
  `;

  const barsEl  = chart.querySelector('.bars');
  const minLine = chart.querySelector('.threshold.min');
  const maxLine = chart.querySelector('.threshold.max');
  const avgLine = chart.querySelector('.threshold.avg');
  let minVal = initialMin, maxVal = initialMax;

  function drawBars() {
    barsEl.innerHTML = '';
    barsEl.className = 'bars ' + style;
    const W = chart.clientWidth;
    const H = chart.clientHeight;
    const margin = 2;
    const barWidth = (W / data.length) - (margin*2);

    data.forEach(v => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      const hPx = (v/100)*H;
      bar.style.setProperty('--bar-height', hPx + 'px');
      bar.style.setProperty('--bar-width',  barWidth + 'px');
      if (style === 'smooth') bar.style.height = hPx + 'px';
      barsEl.appendChild(bar);
    });
  }

  function updateThresholds() {
    minLine.style.left = minVal + '%';
    minLine.querySelector('.value-label').textContent = `${Math.round(minVal)}°C`;
    maxLine.style.left = maxVal + '%';
    maxLine.querySelector('.value-label').textContent = `${Math.round(maxVal)}°C`;

    const avg = (minVal+maxVal)/2;
    avgLine.style.left = avg + '%';
    avgLine.querySelector('.value-label').textContent = `${Math.round(avg)}°C`;
    avgLine.style.display = showAverage ? 'block' : 'none';
  }

  function makeDraggable(el, onChange) {
    let drag = false;
    el.addEventListener('mousedown', e => { e.preventDefault(); drag = true; });
    document.addEventListener('mousemove', e => {
      if (!drag) return;
      const rect = chart.getBoundingClientRect();
      let pct = ((e.clientX - rect.left)/rect.width)*100;
      pct = Math.max(0, Math.min(100, pct));
      onChange(pct); updateThresholds();
    });
    document.addEventListener('mouseup', () => drag = false);
  }

  makeDraggable(minLine, pct => { minVal = Math.min(pct, maxVal); });
  makeDraggable(maxLine, pct => { maxVal = Math.max(pct, minVal); });

  drawBars();
  updateThresholds();

  return {
    setMin(v)    { minVal = v; updateThresholds(); },
    setMax(v)    { maxVal = v; updateThresholds(); },
    toggleAvg(b) { showAverage = b; updateThresholds(); },
    setStyle(s)  { style = s; drawBars(); }
  };
}
