// @strict: true
// @noEmit: true

// repro #51138

type SubTup2FixedLength<T extends unknown[]> = T extends [
  ...infer B extends [any, any],
  any
]
  ? B
  : never;

type SubTup2FixedLengthTest = SubTup2FixedLength<[a: 0, b: 1, c: number]>;

type SubTup2Variadic<T extends unknown[]> = T extends [
  ...infer B extends [any, any],
  ...any
]
  ? B
  : never;

type SubTup2VariadicTest = SubTup2Variadic<[a: 0, b: 1, ...c: number[]]>;
