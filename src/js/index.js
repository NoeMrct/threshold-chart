import '../css/index.css';
import { initChart }        from './init.js';
import { drawBars }         from './bars.js';
import { updateThresholds } from './thresholds.js';
import { makeDraggable }    from './drag.js';

export function createThresholdChart(selector, {
	data = [],
	initialMin = 20,
	initialMax = 80,
	showAverage = false,
	style = 'spikes',
	minLabelPosition = 'bottom',  // 'top' or 'bottom'
	maxLabelPosition = 'bottom',  // 'top' or 'bottom'
	avgLabelPosition = 'top'      // 'top' or 'bottom'
} = {}) {
	const elems = initChart(selector);
	let min = initialMin, max = initialMax;

	// apply label-position classes
	elems.minLine.querySelector('.value-label')
		.classList.add(`label-${minLabelPosition}`);
	elems.maxLine.querySelector('.value-label')
		.classList.add(`label-${maxLabelPosition}`);
	elems.avgLine.querySelector('.value-label')
		.classList.add(`label-${avgLabelPosition}`);

	// draggable
	const minSpacing = 2; // minimum spacing between min and max

	makeDraggable(elems.minLine, elems.chart, v => {
		min = Math.min(v, max - minSpacing);
		render();
	});

	makeDraggable(elems.maxLine, elems.chart, v => {
		max = Math.max(v, min + minSpacing);
		render();
	});


	// render
	function render() {
		drawBars(elems, data, style);
		updateThresholds(elems, min, max, showAverage);
	}
	render();

	return {
		setMin(v)        { min = v; render(); },
		setMax(v)        { max = v; render(); },
		toggleAverage(b) { showAverage = b; render(); },
		setStyle(s)      { style = s; render(); },
		// new setters:
		setMinLabelPos(pos) {   // 'top' or 'bottom'
			const lbl = elems.minLine.querySelector('.value-label');
			lbl.classList.toggle('label-top', pos==='top');
			lbl.classList.toggle('label-bottom', pos==='bottom');
		},
		setMaxLabelPos(pos) {
			const lbl = elems.maxLine.querySelector('.value-label');
			lbl.classList.toggle('label-top', pos==='top');
			lbl.classList.toggle('label-bottom', pos==='bottom');
		},
		setAvgLabelPos(pos) {
			const lbl = elems.avgLine.querySelector('.value-label');
			lbl.classList.toggle('label-top', pos==='top');
			lbl.classList.toggle('label-bottom', pos==='bottom');
		}
	};
}
