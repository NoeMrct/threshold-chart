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
            label.classList.remove('label-top', 'label-bottom');
            label.classList.add(`label-${labelPos}`);
        }
        lineEl.classList.remove('handle-top', 'handle-bottom');
        lineEl.classList.add(labelPos === 'bottom' ? 'handle-top' : 'handle-bottom');
    };

    applyPositions(oElems.minLine, minLabelPosition);
    applyPositions(oElems.maxLine, maxLabelPosition);
    applyPositions(oElems.avgLine, avgLabelPosition);

    const spacing = 2;
    makeDraggable(oElems.minLine, oElems.chart, (pct) => {
        initialMin = Math.min(pct, initialMax - spacing);
        render();
    });
    makeDraggable(oElems.maxLine, oElems.chart, (pct) => {
        initialMax = Math.max(pct, initialMin + spacing);
        render();
    });

    const render = () => {
        drawBars(oElems, data);
        updateThresholds(oElems, initialMin, initialMax, showAverage);
    };
    render();

    return {
        setMin: (v) => { initialMin = v; render(); },
        setMax: (v) => { initialMax = v; render(); },
        toggleAverage: (b) => { showAverage = b; render(); },
        setMinLabelPos: (p) => applyPositions(oElems.minLine, p),
        setMaxLabelPos: (p) => applyPositions(oElems.maxLine, p),
        setAvgLabelPos: (p) => applyPositions(oElems.avgLine, p)
    };
};