// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56970

function partialCallRev<T extends readonly any[], U extends readonly any[], R>(
  f: (...args: [...U, ...T]) => R,
  ...tailArgs: T
) {
  return (...headArgs: U) => f(...headArgs, ...tailArgs);
}

function te(a: number, b: number, c: number): number {
  return a + b + c;
}

const fn = partialCallRev(te, 1);
