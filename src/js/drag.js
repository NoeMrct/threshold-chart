/**
 * Make a threshold handle interactive: drag via Pointer Events (mouse + touch +
 * pen, unified) and operable by keyboard for accessibility. Pointer capture
 * keeps tracking outside the element without any document-level listeners, so
 * teardown is exact and leak-free.
 *
 * @returns {() => void} teardown that removes every listener it added.
 */
export const makeInteractive = (el, chart, onChange, opts = {}) => {
  const step    = opts.step ?? 1;
  const bigStep = opts.bigStep ?? 10;
  let pointerId = null;

  const pctFromClientX = (clientX) => {
    const { left, width } = chart.getBoundingClientRect();
    if (!width) return 0;
    const pct = ((clientX - left) / width) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    pointerId = e.pointerId;
    el.setPointerCapture && el.setPointerCapture(pointerId);
    onChange(pctFromClientX(e.clientX));
  };
  const onPointerMove = (e) => {
    if (pointerId === null || e.pointerId !== pointerId) return;
    onChange(pctFromClientX(e.clientX));
  };
  const onPointerUp = (e) => {
    if (pointerId === null || e.pointerId !== pointerId) return;
    el.releasePointerCapture && el.releasePointerCapture(pointerId);
    pointerId = null;
  };

  const onKeyDown = (e) => {
    const current = Number(el.getAttribute('aria-valuenow')) || 0;
    let next = current;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':  next = current - (e.shiftKey ? bigStep : step); break;
      case 'ArrowRight':
      case 'ArrowUp':    next = current + (e.shiftKey ? bigStep : step); break;
      case 'PageDown':   next = current - bigStep; break;
      case 'PageUp':     next = current + bigStep; break;
      case 'Home':       next = 0; break;
      case 'End':        next = 100; break;
      default: return;
    }
    e.preventDefault();
    onChange(Math.max(0, Math.min(100, next)));
  };

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);
  el.addEventListener('keydown', onKeyDown);

  return () => {
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('pointercancel', onPointerUp);
    el.removeEventListener('keydown', onKeyDown);
  };
};
