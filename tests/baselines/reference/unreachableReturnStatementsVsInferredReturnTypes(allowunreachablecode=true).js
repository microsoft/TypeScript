//// [tests/cases/compiler/unreachableReturnStatementsVsInferredReturnTypes.ts] ////

//// [unreachableReturnStatementsVsInferredReturnTypes.ts]
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


//// [unreachableReturnStatementsVsInferredReturnTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = g;
exports.h = h;
exports.i = i;
exports.foo = foo;
exports.bar = bar;
function g() {
    var x;
    x = 1;
    return x;
    return x;
}
function h() {
    return 1;
    var y;
    y = 1;
    return y;
}
function i() {
    var x;
    x = 1;
    return x;
    x = "foo";
    return x;
}
function throws() {
    throw new Error();
}
function foo() {
    throws();
    return 42;
}
function bar() {
    var x;
    x = 1;
    if (Math.random()) {
        throws();
        return x;
    }
    x = 2;
    return x;
}


//// [unreachableReturnStatementsVsInferredReturnTypes.d.ts]
export declare function g(): number;
export declare function h(): number;
export declare function i(): number;
export declare function foo(): number;
export declare function bar(): number;
