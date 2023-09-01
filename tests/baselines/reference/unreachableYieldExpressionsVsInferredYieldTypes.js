//// [tests/cases/compiler/unreachableYieldExpressionsVsInferredYieldTypes.ts] ////

//// [unreachableYieldExpressionsVsInferredYieldTypes.ts]
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


//// [unreachableYieldExpressionsVsInferredYieldTypes.js]
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
    let x;
    x = 1;
    yield x;
    return true;
    x = "foo";
    yield x;
}


//// [unreachableYieldExpressionsVsInferredYieldTypes.d.ts]
export declare function g(): Generator<number, string, unknown>;
export declare function h(): Generator<never, string, unknown>;
export declare function i(): Generator<boolean, string, unknown>;
export declare function j(): Generator<number, boolean, unknown>;
