export const makeDraggable = (el, chart, onChange) => {
    let isDragging = false;

    // Start drag
    el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
    });

    // Handle movement
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const { left, width } = chart.getBoundingClientRect();
        let pct = ((e.clientX - left) / width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        onChange(pct);
    });

    // End drag
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
};