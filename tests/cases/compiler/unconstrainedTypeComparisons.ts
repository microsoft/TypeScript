// @lib: es2015
// @target: es2015
// @strict: true

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