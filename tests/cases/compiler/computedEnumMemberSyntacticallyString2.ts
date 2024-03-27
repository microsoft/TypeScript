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

  F = BAR,
  G = 2 + BAR,

  H = A,
  I = H + BAR,
  J = H
}

// @filename: ./bar.ts
export const BAR = 'bar';