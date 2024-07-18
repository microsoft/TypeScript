// @lib: es2015
// @target: es2015
// @strict: true
// @noemit: true

function f<T extends {} | undefined | null>(a: T, b: T): boolean {
  return a > b;
}

function g<T>(a: T, b: T): boolean {
  return a > b;
}

function h<T extends unknown>(a: T, b: T): boolean {
  return a > b;
}

function i<T>(a: T, b: T): boolean {
  if (a === undefined) {
      return true;
  }

  return a > b;
}