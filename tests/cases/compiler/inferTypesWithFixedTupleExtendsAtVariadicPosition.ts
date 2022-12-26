// @strict: true
// @noEmit: true

// repro #51138

type SubTup2FixedLength<T extends unknown[]> = T extends [
  ...infer B extends [any, any],
  any
]
  ? B
  : never;

type SubTup2FixedLengthTest = SubTup2FixedLength<[a: 0, b: 1, c: 2]>;

type SubTup2Variadic<T extends unknown[]> = T extends [
  ...infer B extends [any, any],
  ...any
]
  ? B
  : never;

type SubTup2VariadicTest = SubTup2Variadic<[a: 0, b: 1, ...c: 2[]]>;
type SubTup2VariadicTest2 = SubTup2Variadic<[a: 0, b: 1, c: 2, ...d: 3[]]>;

type SubTup2VariadicAndRest<T extends unknown[]> = T extends [
    ...infer B extends [any, any],
    ...(infer C)[]
]
    ? [...B, ...[C]]
    : never;

type SubTup2VariadicAndRestTest = SubTup2VariadicAndRest<[a: 0, b: 1, ...c: 2[]]>;

type SubTup2TrailingVariadic<T extends unknown[]> = T extends [
  ...any,
  ...infer B extends [any, any],
]
  ? B
  : never;

type SubTup2TrailingVariadicTest = SubTup2TrailingVariadic<[...a: 0[], b: 1, c: 2]>;
type SubTup2TrailingVariadicTest2 = SubTup2TrailingVariadic<[...a: 0[], b: 1, c: 2, d: 3]>;

type SubTup2RestAndTrailingVariadic2<T extends unknown[]> = T extends [
    ...(infer C)[],
    ...infer B extends [any, any],
]
    ? [C, ...B]
    : never;

type SubTup2RestAndTrailingVariadic2Test = SubTup2RestAndTrailingVariadic2<[...a: 0[], b: 1, c: 2]>;

type SubTup2VariadicWithLeadingFixedElements<T extends unknown[]> = T extends [
  any,
  ...infer B extends [any, any],
  ...any
]
  ? B
  : never;

type SubTup2VariadicWithLeadingFixedElementsTest = SubTup2VariadicWithLeadingFixedElements<[a: 0, b: 1, c: 2, ...d: 3[]]>;
type SubTup2VariadicWithLeadingFixedElementsTest2 = SubTup2VariadicWithLeadingFixedElements<[a: 0, b: 1, c: 2, d: 3, ...e: 4[]]>;

type SubTup2TrailingVariadicWithTrailingFixedElements<T extends unknown[]> = T extends [
  ...any,
  ...infer B extends [any, any],
  any,
]
  ? B
  : never;

type SubTup2TrailingVariadicWithTrailingFixedElementsTest = SubTup2TrailingVariadicWithTrailingFixedElements<[...a: 0[], b: 1, c: 2, d: 3]>;
type SubTup2TrailingVariadicWithTrailingFixedElementsTest2 = SubTup2TrailingVariadicWithTrailingFixedElements<[...a: 0[], b: 1, c: 2, d: 3, e: 4]>;
