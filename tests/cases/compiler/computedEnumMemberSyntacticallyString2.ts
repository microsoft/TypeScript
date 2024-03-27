// @isolatedModules: true,false
// @noTypesAndSymbols: true
// @target: esnext

// @filename: ./foo.ts
import { BAR } from './bar';
const LOCAL = 'LOCAL';

enum Foo {
  A = `${BAR}`,

  B = LOCAL,
  C = B,
  D = C + 'BAR',

  E1 = (`${BAR}`) as string, // We could recognize these,
  E2 = `${BAR}`!,             // but Babel doesn't

  F = BAR,
  G = 2 + BAR,

  H = A,
  I = H + BAR,
  J = H
}

// @filename: ./bar.ts
export const BAR = 'bar';