# threshold-chart

A lightweight **Vanilla JS + CSS** component that renders a bar chart with two
**draggable, keyboard-accessible thresholds** (min / max) and an optional
**computed average** indicator. Zero runtime dependencies. Shipped as ESM,
CommonJS and UMD, with TypeScript types.

---

## 🚀 Features

* Draggable **min** / **max** thresholds (mouse, touch and pen via Pointer Events)
* **Keyboard accessible**: focusable sliders with `role="slider"` + arrow / Home / End / PageUp-Down support
* Optional **average** that shows the *real mean of the in-range values* (not a midpoint)
* **Responsive** (fluid width) and **themeable** through CSS custom properties
* Automatic **value-domain normalization** (handles negatives and arbitrary scales)
* Bundled type declarations (`index.d.ts`)
* Distributed as **ESM**, **CommonJS** and **UMD** (CDN-ready)

---

## 📦 Installation

```bash
npm install threshold-chart
```

---

## 🔧 Usage

### With a bundler (ESM / CommonJS)

```js
import 'threshold-chart/style.css';
import { createThresholdChart } from 'threshold-chart';

const data = Array.from({ length: 60 }, () => Math.random() * 100);

const chart = createThresholdChart('#myChart', {
  data,
  initialMin: 10,
  initialMax: 90,
  showAverage: true,
  onThresholdChange: ({ min, max, average }) => console.log(min, max, average),
});
```

```html
<div id="myChart"></div>
```

### Without a bundler (UMD / CDN)

```html
<link rel="stylesheet" href="https://unpkg.com/threshold-chart/dist/style.css">
<script src="https://unpkg.com/threshold-chart/dist/index.umd.js"></script>

<div id="myChart"></div>
<script>
  ThresholdChart.createThresholdChart('#myChart', {
    data: Array.from({ length: 60 }, () => Math.random() * 100),
    showAverage: true,
  });
</script>
```

`createThresholdChart` accepts a **CSS selector or an `HTMLElement`** as its first argument.

---

## 🧭 What min / max / average mean

`min` and `max` are **horizontal positions** (0–100, as a percentage of the chart
width). Together they select a contiguous window of the series; bars inside the
window are highlighted, bars outside are dimmed. When `showAverage` is enabled,
a third (non-draggable) line marks the centre of the selection and its label
shows the **arithmetic mean of the values of the bars currently inside the
window** — or `null` when the window is empty.

---

## ⚙️ Options

| Option             | Type                                   | Default     | Description                                                     |
| ------------------ | -------------------------------------- | ----------- | --------------------------------------------------------------- |
| `data`             | `number[]`                             | `[]`        | Values used to generate bar heights.                            |
| `initialMin`       | `number`                               | `20`        | Initial min position (0–100).                                   |
| `initialMax`       | `number`                               | `80`        | Initial max position (0–100).                                   |
| `showAverage`      | `boolean`                              | `false`     | Show the computed average indicator.                            |
| `minLabelPosition` | `'top' \| 'bottom'`                    | `'bottom'`  | Position of the min label.                                      |
| `maxLabelPosition` | `'top' \| 'bottom'`                    | `'bottom'`  | Position of the max label.                                      |
| `avgLabelPosition` | `'top' \| 'bottom'`                    | `'top'`     | Position of the average label.                                  |
| `spacing`          | `number`                               | `2`         | Minimum gap (in %) kept between the min and max handles.        |
| `valueDomain`      | `[number, number] \| null`             | `null`      | `[lo, hi]` for bar-height mapping. Auto-derived from data when null. |
| `formatLabel`      | `(value, kind) => string \| number`    | rounds      | Format a label. `kind` is `'min' \| 'max' \| 'avg'`.            |
| `onMinChange`      | `(min: number) => void`                | —           | Called when the min handle moves.                               |
| `onMaxChange`      | `(max: number) => void`                | —           | Called when the max handle moves.                               |
| `onThresholdChange`| `(state) => void`                      | —           | Called on any change with `{ min, max, average }`.              |

---

## 🔗 Returned API

```ts
interface ThresholdChartAPI {
  setMin(v: number): void;          // clamped + gap-enforced
  setMax(v: number): void;          // clamped + gap-enforced
  toggleAverage(show: boolean): void;
  setMinLabelPos(pos: 'top' | 'bottom'): void;
  setMaxLabelPos(pos: 'top' | 'bottom'): void;
  setAvgLabelPos(pos: 'top' | 'bottom'): void;
  setData(data: number[]): void;    // replace data and redraw
  getMin(): number;
  getMax(): number;
  getAverage(): number | null;
  getState(): { min: number; max: number; average: number | null };
  destroy(): void;                  // removes all listeners + injected DOM
}
```

`setMin` / `setMax` go through the exact same clamping, gap and callback logic
as dragging and keyboard input.

---

## ⌨️ Accessibility

The min and max handles are real sliders: focusable (`tabindex="0"`), labelled,
and with live `aria-valuenow`. Keyboard:

* `←` / `↓` and `→` / `↑` — move by 1 (hold **Shift** for 10)
* `PageUp` / `PageDown` — move by 10
* `Home` / `End` — jump to 0 / 100

---

## 🎨 Theming

Override any of these CSS custom properties on the container (or an ancestor):

| Variable               | Default                   | Purpose                              |
| ---------------------- | ------------------------- | ------------------------------------ |
| `--tc-width`           | `100%`                    | Chart width (set e.g. `600px`).      |
| `--tc-height`          | `100px`                   | Chart height.                        |
| `--tc-bar-color`       | `#444`                    | Bar colour.                          |
| `--tc-out-opacity`     | `0.3`                     | Opacity of out-of-range bars.        |
| `--tc-threshold-color` | `#fff`                    | Min/max line + knob colour.          |
| `--tc-avg-color`       | `var(--tc-threshold-color)` | Average line + knob colour.        |
| `--tc-handle-size`     | `13px`                    | Knob diameter.                       |
| `--tc-handle-width`    | `30px`                    | Clickable width of a handle.         |
| `--tc-drag-pad`        | `20px`                    | Extra drag area above/below.         |
| `--tc-label-color`     | `#fff`                    | Label colour.                        |
| `--tc-label-size`      | `22px`                    | Label font size.                     |

```css
#myChart {
  --tc-width: 600px;
  --tc-bar-color: #3b82f6;
  --tc-avg-color: #f59e0b;
}
```

> Labels are drawn just outside the chart box, so leave a little vertical room
> around the container.

---

## 🛠️ Development

```bash
git clone https://github.com/NoeMrct/threshold-chart.git
cd threshold-chart
npm install
npm run build   # bundles dist/ (ESM, CJS, UMD, CSS) + copies types
npm test        # Vitest + jsdom
```

Open `demo.html` after building to see it in action.

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch `feature/<your-feature>`
3. Commit your changes (add tests where relevant)
4. Open a Pull Request

---

## 📄 License

MIT © Noé Mercourt
