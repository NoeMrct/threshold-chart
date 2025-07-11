# threshold-chart

A lightweight **Vanilla JS** and **CSS** component for rendering an interactive bar chart with three draggable thresholds: **min**, **max**, and **average**.

---

## 🚀 Features

* Draggable **min** and **max** thresholds
* Optional **average** threshold
* Pure **Vanilla JS** and **CSS** with zero external dependencies
* Distributed as **ES Module**, **CommonJS**, and **UMD** (for CDN usage)

---

## 📦 Installation

```bash
npm install threshold-chart
```

---

## 🔧 Usage

### 1. With a bundler (ESM / CommonJS)

1. **Import** the CSS and module:

   ```js
   import 'threshold-chart/dist/style.css';
   import { createThresholdChart } from 'threshold-chart';
   ```

2. **Add** a container in your HTML:

   ```html
   <div id="myChart"></div>
   ```

3. **Initialize** the chart:

   ```js
   const data = Array.from({ length: 60 }, () => Math.random() * 100);

   const chart = createThresholdChart('#myChart', {
     data,
     initialMin: 10,
     initialMax: 90,
     showAverage: true,
     minLabelPosition: 'bottom',
     maxLabelPosition: 'bottom',
     avgLabelPosition: 'top'
   });
   ```

---

### 2. Without a bundler (UMD / CDN)

```html
<link rel="stylesheet" href="https://unpkg.com/threshold-chart/dist/style.css">
<script src="https://unpkg.com/threshold-chart/dist/index.umd.js"></script>

<div id="myChart"></div>
<script>
  const data = Array.from({ length: 60 }, () => Math.random() * 100);

  const chart = ThresholdChart.createThresholdChart('#myChart', {
    data,
    initialMin: 10,
    initialMax: 90,
    showAverage: true,
    minLabelPosition: 'bottom',
    maxLabelPosition: 'bottom',
    avgLabelPosition: 'top'
  });
</script>
```

---

## ⚙️ Options

| Option             | Type       | Default    | Description                                                      |
| ------------------ | ---------- | ---------- | ---------------------------------------------------------------- |
| `data`             | `number[]` | `[]`       | Array of values (0–100) to generate bar heights.                 |
| `initialMin`       | `number`   | `20`       | Initial **min** threshold position as percentage of chart width. |
| `initialMax`       | `number`   | `80`       | Initial **max** threshold position as percentage of chart width. |
| `showAverage`      | `boolean`  | `false`    | Whether to display the **average** threshold.                    |
| `minLabelPosition` | `string`   | `'bottom'` | Position of the **min** label: `'top'` or `'bottom'`.            |
| `maxLabelPosition` | `string`   | `'bottom'` | Position of the **max** label: `'top'` or `'bottom'`.            |
| `avgLabelPosition` | `string`   | `'top'`    | Position of the **average** label: `'top'` or `'bottom'`.        |

---

## 🔗 Returned API

The `createThresholdChart` function returns an object with the following methods:

```ts
interface ThresholdChartAPI {
  /** Move the min threshold to `v` (0–100) */
  setMin(v: number): void;
  /** Move the max threshold to `v` (0–100) */
  setMax(v: number): void;
  /** Enable or disable the average threshold */
  toggleAverage(show: boolean): void;
  /** Update position of the min label: `'top'` or `'bottom'` */
  setMinLabelPos(pos: 'top' | 'bottom'): void;
  /** Update position of the max label: `'top'` or `'bottom'` */
  setMaxLabelPos(pos: 'top' | 'bottom'): void;
  /** Update position of the average label: `'top'` or `'bottom'` */
  setAvgLabelPos(pos: 'top' | 'bottom'): void;
}
```

---

## 🛠️ Development & Build

1. **Clone the repository**

   ```bash
   git clone https://github.com/NoeMrct/threshold-chart.git
   cd threshold-chart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build** the package

   ```bash
   npm run build
   ```

---

## 🤝 Contributing

1. Fork this repository
2. Create a branch `feature/<your-feature>`
3. Commit your changes
4. Open a Pull Request

Thank you for your contributions! 🎉

---

## 📄 License

MIT © Mercourt Noé