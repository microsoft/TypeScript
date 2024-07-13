//// [tests/cases/compiler/unconstrainedTypeComparisons.ts] ////

//// [unconstrainedTypeComparisons.ts]
export function f<T extends {} | undefined | null>(a: T, b: T): boolean {
  return a > b;
}

export function g<T>(a: T, b: T): boolean {
  return a > b;
}

function h<T>(a: T, b: T): boolean {
  if (a === undefined) {
      return true;
  }

  return a > b;
}

//// [unconstrainedTypeComparisons.js]
export function f(a, b) {
    return a > b;
}
export function g(a, b) {
    return a > b;
}
function h(a, b) {
    if (a === undefined) {
        return true;
    }
    return a > b;
}
