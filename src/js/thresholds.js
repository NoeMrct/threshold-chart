export const updateThresholds = (oElems, min, max, showAvg) => {
    const avg = (min + max) / 2;
    const entries = [
        [oElems.minLine, min],
        [oElems.maxLine, max],
        [oElems.avgLine, avg]
    ];
    entries.forEach(([el, val]) => {
        el.style.left = `${val}%`;
        const label = el.querySelector('.value-label');
        if (label) label.textContent = Math.round(val);
    });

    // Toggle average line visibility
    if (showAvg) {
        oElems.avgLine.style.display = '';
    } else {
        oElems.avgLine.style.display = 'none';
    }
};