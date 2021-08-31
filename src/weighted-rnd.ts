import { csprng } from './rng';

export function weightedRand(spec: { [k: number]: number }): string {
  const rand = csprng(0, 100) * 0.01;
  let sum = 0;

  for (let i in spec) {
    sum += spec[i];
    if (rand <= sum) return i;
  }

  return '';
}
