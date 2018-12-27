import { PRECISION } from '../constants';

export function round(value: number): number {
  return Math.round(value * PRECISION) / PRECISION;
}
