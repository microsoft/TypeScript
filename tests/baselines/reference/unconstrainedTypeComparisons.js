//// [tests/cases/compiler/unconstrainedTypeComparisons.ts] ////

//// [unconstrainedTypeComparisons.ts]
export function g<T>(a: T, b: T): boolean {
  return a > b;
}

//// [unconstrainedTypeComparisons.js]
export function g(a, b) {
    return a > b;
}
