export const makeDraggable = (el, chart, onChange) => {
	let isDragging = false;

	const getPct = (clientX) => {
		const { left, width } = chart.getBoundingClientRect();
		let pct = ((clientX - left) / width) * 100;
		return Math.max(0, Math.min(100, pct));
	};

	const start = (x) => {
		isDragging = true;
		onChange(getPct(x));
	};
	const move = (x) => {
		if (!isDragging) return;
		onChange(getPct(x));
	};
	const end = () => {
		isDragging = false;
	};

	// Mouse events
	el.addEventListener('mousedown', (e) => { e.preventDefault(); start(e.clientX); });
	document.addEventListener('mousemove', (e) => move(e.clientX));
	document.addEventListener('mouseup', () => end());

	// Touch events
	el.addEventListener('touchstart', (e) => { e.preventDefault(); start(e.touches[0].clientX); });
	document.addEventListener('touchmove', (e) => { e.preventDefault(); move(e.touches[0].clientX); });
	document.addEventListener('touchend', () => end());
};