const PRECISION = 1000;

export function round(value: number): number {
  return Math.round(value * PRECISION) / PRECISION;
}
