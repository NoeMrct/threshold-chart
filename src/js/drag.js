// Make an element draggable horizontally within the chart
export function makeDraggable(el, chart, onChange) {
	let isDragging = false;

	el.addEventListener('mousedown', e => {
		e.preventDefault();
		isDragging = true;
	});

	document.addEventListener('mousemove', e => {
		if (!isDragging) return;
		const rect = chart.getBoundingClientRect();
		let pct = ((e.clientX - rect.left) / rect.width) * 100;
		pct = Math.max(0, Math.min(100, pct));
		onChange(pct);
	});

	document.addEventListener('mouseup', () => {
		isDragging = false;
	});
}
