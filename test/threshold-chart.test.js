import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createThresholdChart } from '../src/js/index.js';

const mount = () => {
  const host = document.createElement('div');
  host.id = 'chart';
  document.body.appendChild(host);
  return host;
};

describe('createThresholdChart', () => {
  beforeEach(() => { document.body.innerHTML = ''; });

  it('builds the expected DOM with accessible sliders', () => {
    const host = mount();
    createThresholdChart('#chart', { data: [1, 2, 3, 4, 5] });

    expect(host.classList.contains('chart-container')).toBe(true);
    expect(host.querySelectorAll('.bars .bar')).toHaveLength(5);

    const min = host.querySelector('.threshold.min');
    expect(min.getAttribute('role')).toBe('slider');
    expect(min.getAttribute('aria-valuemin')).toBe('0');
    expect(min.getAttribute('aria-valuemax')).toBe('100');
    expect(min.getAttribute('aria-valuenow')).toBe('20'); // default initialMin
    // avg is informational, not a slider
    expect(host.querySelector('.threshold.avg').getAttribute('role')).toBe('img');
  });

  it('accepts an HTMLElement as well as a selector', () => {
    const host = mount();
    const api = createThresholdChart(host, { data: [1, 2, 3] });
    expect(api.getMin()).toBe(20);
  });

  it('clamps and enforces the gap on setMin / setMax', () => {
    mount();
    const api = createThresholdChart('#chart', { initialMin: 20, initialMax: 80, spacing: 2 });

    api.setMin(95);              // cannot cross max - spacing
    expect(api.getMin()).toBe(78);

    api.setMin(-10);             // clamped to 0
    expect(api.getMin()).toBe(0);

    api.setMax(-5);              // cannot cross min + spacing
    expect(api.getMax()).toBe(api.getMin() + 2);
  });

  it('computes the REAL average of the in-range values', () => {
    mount();
    const data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]; // count = 10
    const api = createThresholdChart('#chart', {
      data, initialMin: 20, initialMax: 80, showAverage: true,
    });
    // indices floor(.2*10)=2 .. floor(.8*10)=8 -> values 20..80 -> mean 50
    expect(api.getAverage()).toBe(50);
  });

  it('toggles the average on and off', () => {
    mount();
    const api = createThresholdChart('#chart', { data: [1, 2, 3, 4], showAverage: true });
    expect(api.getAverage()).not.toBeNull();

    api.toggleAverage(false);
    expect(api.getAverage()).toBeNull();
    expect(document.querySelector('.threshold.avg').style.display).toBe('none');
  });

  it('fires onMinChange and onThresholdChange', () => {
    mount();
    const onMinChange = vi.fn();
    const onThresholdChange = vi.fn();
    const api = createThresholdChart('#chart', { data: [1, 2, 3], onMinChange, onThresholdChange });

    api.setMin(40);
    expect(onMinChange).toHaveBeenCalledWith(40);
    expect(onThresholdChange).toHaveBeenCalledWith(
      expect.objectContaining({ min: 40, max: 80 })
    );
  });

  it('moves the handle with the keyboard', () => {
    mount();
    const api = createThresholdChart('#chart', { initialMin: 20 });
    const min = document.querySelector('.threshold.min');

    min.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(api.getMin()).toBe(21);

    min.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', shiftKey: true, bubbles: true }));
    expect(api.getMin()).toBe(11); // 21 - 10
  });

  it('cleans up on destroy', () => {
    const host = mount();
    const api = createThresholdChart('#chart', { data: [1, 2, 3] });

    api.destroy();
    expect(host.innerHTML).toBe('');
    expect(host.classList.contains('chart-container')).toBe(false);
    expect(() => api.destroy()).not.toThrow(); // idempotent-ish
  });
});
