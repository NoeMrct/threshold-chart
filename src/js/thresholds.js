// Update min, max, and average lines and labels
export function updateThresholds({ minLine, maxLine, avgLine }, min, max, showAvg) {
	const avg = (min + max) / 2;

	// min and max
	[[minLine, min], [maxLine, max], [avgLine, avg]].forEach(([el, val]) => {
		el.style.left = `${val}%`;
		el.querySelector('.value-label').textContent = `${Math.round(val)}°C`;
	});

	// show or hide average
	avgLine.style.display = showAvg ? 'block' : 'none';
}
