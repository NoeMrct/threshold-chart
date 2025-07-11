export const updateThresholds = (oElems, min, max, showAvg) => {
	const avg = (min + max) / 2;
	[[oElems.minLine, min], [oElems.maxLine, max], [oElems.avgLine, avg]].forEach(([el, val]) => {
		el.style.left = `${val}%`;
		const label = el.querySelector('.value-label');
		if (label) label.textContent = Math.round(val);
	});
	oElems.avgLine.style.display = showAvg ? '' : 'none';
};