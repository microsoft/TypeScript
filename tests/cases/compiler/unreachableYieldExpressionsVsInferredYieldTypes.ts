// @strict: true
// @target: esnext
// @lib: esnext
// @declaration: true

export function* g() {
  let x;
  x = 1;
  yield x;
  return 'foo';
  yield x;
}

export function* h() {
  return 'foo';
  let y;
  y = 1;
  yield y;
}

export function* i() {
  yield true;
  return 'foo';
  let y;
  y = 1;
  yield y;
}

export function* j() {
  let x: string | number | boolean;
  x = 1;
  yield x;
  return true;

  x = "foo";
  yield x;
}
