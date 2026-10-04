// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57807

interface NMap {
  1: 'A'
  2: 'B'
  3: 'C'
  4: 'D'
}

declare const g: <T extends 1 | 2 | 3>(x: `${T}`) => NMap[T]

type G1 = <T extends 1 | 2 | 3>(x: `${T}`) => NMap[T]
const g1: G1 = g; // ok

type G2 = <T extends 1 | 2 | 3 | 4>(x: `${T}`) => NMap[T]
const g2: G2 = g; // error

type G3 = <T extends 1 | 2>(x: `${T}`) => NMap[T]
const g3: G3 = g; // ok
