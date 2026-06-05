export type LabelPosition = 'top' | 'bottom';
export type ThresholdKind = 'min' | 'max' | 'avg';

export interface ThresholdChartOptions {
  /** Values used to generate bar heights. */
  data?: number[];
  /** Initial min handle position, 0–100 (% of chart width). Default 20. */
  initialMin?: number;
  /** Initial max handle position, 0–100 (% of chart width). Default 80. */
  initialMax?: number;
  /** Show the computed average indicator. Default false. */
  showAverage?: boolean;
  /** Position of the min label. Default 'bottom'. */
  minLabelPosition?: LabelPosition;
  /** Position of the max label. Default 'bottom'. */
  maxLabelPosition?: LabelPosition;
  /** Position of the average label. Default 'top'. */
  avgLabelPosition?: LabelPosition;
  /** Minimum gap (in %) kept between the min and max handles. Default 2. */
  spacing?: number;
  /** [lo, hi] domain for mapping data to bar heights. Auto-derived when null. */
  valueDomain?: [number, number] | null;
  /** Format a label value. Default rounds to the nearest integer. */
  formatLabel?: (value: number, kind: ThresholdKind) => string | number;
  /** Called whenever the min handle moves. */
  onMinChange?: (min: number) => void;
  /** Called whenever the max handle moves. */
  onMaxChange?: (max: number) => void;
  /** Called whenever min or max changes, with the full state. */
  onThresholdChange?: (state: ThresholdState) => void;
}

export interface ThresholdState {
  /** Min handle position (0–100). */
  min: number;
  /** Max handle position (0–100). */
  max: number;
  /** Mean of the in-range values, or null when nothing is in range / disabled. */
  average: number | null;
}

export interface ThresholdChartAPI {
  /** Move the min handle to `v` (0–100); clamped and gap-enforced. */
  setMin(v: number): void;
  /** Move the max handle to `v` (0–100); clamped and gap-enforced. */
  setMax(v: number): void;
  /** Enable or disable the average indicator. */
  toggleAverage(show: boolean): void;
  setMinLabelPos(pos: LabelPosition): void;
  setMaxLabelPos(pos: LabelPosition): void;
  setAvgLabelPos(pos: LabelPosition): void;
  /** Replace the data set and redraw the bars. */
  setData(data: number[]): void;
  getMin(): number;
  getMax(): number;
  getAverage(): number | null;
  getState(): ThresholdState;
  /** Remove listeners and DOM injected by the chart. */
  destroy(): void;
}

export function createThresholdChart(
  selector: string | HTMLElement,
  options?: ThresholdChartOptions
): ThresholdChartAPI;
