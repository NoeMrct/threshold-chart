// index.js
import '../css/index.css';
import { initChart }        from './init.js';
import { drawBars }         from './bars.js';
import { updateThresholds } from './thresholds.js';
import { makeDraggable }    from './drag.js';

// Public API to create the threshold chart
export function createThresholdChart(selector, {
	data = [],
	initialMin = 20,
	initialMax = 80,
	showAverage = false,
	style = 'spikes'
} = {}) {

	const elems = initChart(selector);
	let min = initialMin;
	let max = initialMax;

	// Attach dragging for min and max lines
	makeDraggable(elems.minLine, elems.chart, v => (min = Math.min(v, max)));
	makeDraggable(elems.maxLine, elems.chart, v => (max = Math.max(v, min)));

	// Render everything
	function render() {
		drawBars(elems, data, style);
		updateThresholds(elems, min, max, showAverage);
	}

	render();

	// Exposed control methods
	return {
		setMin(v)       { min = v; render(); },
		setMax(v)       { max = v; render(); },
		toggleAverage(b){ showAverage = b; render(); },
		setStyle(s)     { style = s; render(); }
	};
}
