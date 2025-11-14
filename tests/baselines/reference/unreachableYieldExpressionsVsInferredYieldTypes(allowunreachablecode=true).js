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

function throws(): never {
  throw new Error();
}

export function* foo() {
  throws();
  yield 42;
}

export function* bar() {
  var x;
  x = 1;
  if (Math.random()) {
    throws();
    yield x;
  }
  x = 2;
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
function throws() {
    throw new Error();
}
export function* foo() {
    throws();
    yield 42;
}
export function* bar() {
    var x;
    x = 1;
    if (Math.random()) {
        throws();
        yield x;
    }
    x = 2;
    yield x;
}


//// [unreachableYieldExpressionsVsInferredYieldTypes.d.ts]
export declare function g(): Generator<never, string, unknown>;
export declare function h(): Generator<never, string, unknown>;
export declare function i(): Generator<never, string, unknown>;
export declare function j(): Generator<never, boolean, unknown>;
export declare function foo(): Generator<never, void, unknown>;
export declare function bar(): Generator<never, void, unknown>;
