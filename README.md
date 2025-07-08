# threshold-chart

A lightweight **Vanilla JS** and **CSS** component for rendering a temperature chart with three draggable thresholds: min, max, and average.

---

## 🚀 Features

- Draggable **min** and **max** thresholds  
- Optional **average** threshold  
- Two rendering styles:  
  - **Spikes** (triangles)  
  - **Smooth** (rounded-top bars)  
- Zero external dependencies (pure JS/CSS)  
- Distributed as ES Module, CommonJS, and UMD (for CDN)

---

## 📦 Installation

```bash
npm install threshold-chart
```

---

## 🔧 Usage

### 1. With a bundler (ESM / CommonJS)

1. **Import** the CSS and function:

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
     style: 'smooth' // or 'spikes'
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
    style: 'spikes'
  });
</script>
```

---

## ⚙️ Options

| Option        | Type                     | Default    | Description                                                 |
| ------------- | ------------------------ | ---------- | ----------------------------------------------------------- |
| `data`        | `number[]`               | `[]`       | Array of values (0–100) to generate bar heights.            |
| `initialMin`  | `number`                 | `20`       | Initial position of the **min** threshold (as % of width).  |
| `initialMax`  | `number`                 | `80`       | Initial position of the **max** threshold (as % of width).  |
| `showAverage` | `boolean`                | `false`    | Show the **average** threshold `(min+max)/2` when `true`.   |
| `style`       | `'spikes'` \| `'smooth'` | `'spikes'` | Choose the rendering style: triangle spikes or smooth bars. |

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
  /** Switch rendering style: 'spikes' or 'smooth' */
  setStyle(style: 'spikes' | 'smooth'): void;
}
```

---

## 🛠️ Development & Build

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/threshold-chart.git
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

4. **Test** (optional)

   ```bash
   npm test
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
