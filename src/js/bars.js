export const drawBars = (oOptions, aData) => {
    const barsEl = oOptions.barsEl;
    // Clear container and enforce spikes mode
    barsEl.innerHTML = '';
    barsEl.className = 'bars spikes';

    const { clientWidth: width, clientHeight: height } = barsEl;
    const count = aData.length;
    const margin = 2; // px on each side
    const barWidth = width / count - margin * 2;

    aData.forEach((value) => {
        // Create bar element
        const barEl = document.createElement('div');
        barEl.classList.add('bar');

        // Set CSS custom properties and margin
        barEl.style.setProperty('--bar-width', `${barWidth}px`);
        barEl.style.setProperty('--bar-height', `${(value / 100) * height}px`);
        barEl.style.margin = `0 ${margin}px`;

        barsEl.appendChild(barEl);
    });
};