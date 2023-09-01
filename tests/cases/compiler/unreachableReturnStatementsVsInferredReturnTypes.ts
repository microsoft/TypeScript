// @strict: true
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
