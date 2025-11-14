// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56970

function partialCall1<T extends readonly any[], U extends readonly any[], R>(
  f: (...args: [...U, ...T]) => R,
  ...tailArgs: T
) {
  return (...headArgs: U) => f(...headArgs, ...tailArgs);
}

function source1(a: number, b: number, c: number): number {
  return a + b + c;
}

const result1 = partialCall1(source1, 1);

function partialCall2<T extends readonly any[], U extends readonly any[], R>(
  f: (...args: [number, ...U, ...T]) => R,
  ...tailArgs: T
) {
  return (...headArgs: U) => f(0, ...headArgs, ...tailArgs);
}

function source2(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}

const result2 = partialCall2(source2, 1);

function partialCall3<T extends readonly any[], U extends readonly any[], R>(
  f: (...args: [...U, ...T, number]) => R,
  ...tailArgs: T
) {
  return (...headArgs: U) => f(...headArgs, ...tailArgs, 100);
}

function source3(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
}

const result3 = partialCall3(source3, 1);

export {}
