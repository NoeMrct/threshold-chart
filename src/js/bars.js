// Render bars according to data and style
export function drawBars({ barsEl, chart }, data, style) {
	barsEl.innerHTML = '';
	barsEl.className = 'bars ' + style;

	const width = chart.clientWidth;
	const height = chart.clientHeight;
	const barCount = data.length;
	const margin = 2;
	const barWidth = width / barCount - margin * 2;

	data.forEach(value => {
		const bar = document.createElement('div');
		bar.className = 'bar';
		const h = (value / 100) * height;
		bar.style.setProperty('--bar-height', `${h}px`);
		bar.style.setProperty('--bar-width', `${barWidth}px`);
		if (style === 'smooth') {
			bar.style.height = `${h}px`;
		}
		barsEl.appendChild(bar);
	});
}
