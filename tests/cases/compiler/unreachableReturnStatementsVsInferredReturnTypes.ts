// @strict: true
// @allowUnreachableCode: true, false
// @declaration: true

export function g() {
  let x;
  x = 1;
  return x;
  return x;
}

export function h() {
  return 1;
  let y;
  y = 1;
  return y;
}

export function i() {
  let x: string | number | boolean;
  x = 1;
  return x;

  x = "foo";
  return x;
}

function throws(): never {
  throw new Error();
}

export function foo() {
  throws();
  return 42;
}

export function bar() {
  var x;
  x = 1;
  if (Math.random()) {
    throws();
    return x;
  }
  x = 2;
  return x;
}
