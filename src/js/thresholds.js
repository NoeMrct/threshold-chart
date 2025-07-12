export const updateThresholds = (oElems, min, max, showAvg) => {
	const avg = (min + max) / 2;
	[[oElems.minLine, min], [oElems.maxLine, max], [oElems.avgLine, avg]]
		.forEach(([el, val]) => {
		el.style.left = `calc(${val}%)`;
		const lbl = el.querySelector('.value-label');
		if (lbl) lbl.textContent = Math.round(val);
		});
	oElems.avgLine.style.display = showAvg ? '' : 'none';
}