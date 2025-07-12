import '../css/index.css';
import { drawBars } from './bars.js';
import { makeDraggable } from './drag.js';
import { initChart } from './init.js';
import { updateThresholds } from './thresholds.js';

export const createThresholdChart = (selector, options = {}) => {
	let {
		data = [],
		initialMin = 20,
		initialMax = 80,
		showAverage = false,
		minLabelPosition = 'bottom',
		maxLabelPosition = 'bottom',
		avgLabelPosition = 'top'
	} = options;

	const oElems = initChart(selector);

	const applyPositions = (lineEl, labelPos) => {
		const label = lineEl.querySelector('.value-label');
		if (label) {
			label.classList.toggle('label-top', labelPos === 'top');
			label.classList.toggle('label-bottom', labelPos === 'bottom');
		}
		lineEl.classList.toggle('handle-top', labelPos === 'bottom');
		lineEl.classList.toggle('handle-bottom', labelPos === 'top');
	};

	applyPositions(oElems.minLine, minLabelPosition);
	applyPositions(oElems.maxLine, maxLabelPosition);
	applyPositions(oElems.avgLine, avgLabelPosition);

	const spacing = 2;
	makeDraggable(oElems.minLine, oElems.chart, (pct) => {
		initialMin = Math.min(pct, initialMax - spacing);
		render();
		options.onMinChange && options.onMinChange(initialMin);
		options.onThresholdChange && options.onThresholdChange({ min: initialMin, max: initialMax, avg: (initialMin + initialMax) / 2 });
	});
	makeDraggable(oElems.maxLine, oElems.chart, (pct) => {
		initialMax = Math.max(pct, initialMin + spacing);
		render();
		options.onMaxChange && options.onMaxChange(initialMax);
		options.onThresholdChange && options.onThresholdChange({ min: initialMin, max: initialMax, avg: (initialMin + initialMax) / 2 });
	});

	function highlightBars(barsEl, minPct, maxPct) {
		const bars  = Array.from(barsEl.children);
		const count = bars.length;
		// on ne dépasse pas la barre max grâce au floor()
		const startIdx = Math.floor((minPct / 100) * count);
		const   endIdx = Math.floor((maxPct / 100) * count);

		bars.forEach((bar, i) => {
			if (i >= startIdx && i <= endIdx) {
				bar.classList.add('bar--in-range');
				bar.classList.remove('bar--out-of-range');
			} else {
				bar.classList.add('bar--out-of-range');
				bar.classList.remove('bar--in-range');
			}
		});
	}

	// Re-render on resize for responsiveness
	let resizeTimeout;
	const onResize = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(render, 100);
	};
	window.addEventListener('resize', onResize);

	const render = () => {
		drawBars(oElems, data);
		updateThresholds(oElems, initialMin, initialMax, showAverage);
		highlightBars(oElems.barsEl, initialMin, initialMax);
	};

	render();

	return {
		setMin: (v) => { initialMin = v; render(); },
		setMax: (v) => { initialMax = v; render(); },
		toggleAverage: (b) => { showAverage = b; render(); },
		setMinLabelPos: (p) => applyPositions(oElems.minLine, p),
		setMaxLabelPos: (p) => applyPositions(oElems.maxLine, p),
		setAvgLabelPos: (p) => applyPositions(oElems.avgLine, p),
		destroy: () => { window.removeEventListener('resize', onResize); }
	};
};