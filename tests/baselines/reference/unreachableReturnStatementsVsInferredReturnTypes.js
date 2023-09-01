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


//// [unreachableReturnStatementsVsInferredReturnTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i = exports.h = exports.g = void 0;
function g() {
    var x;
    x = 1;
    return x;
    return x;
}
exports.g = g;
function h() {
    return 1;
    var y;
    y = 1;
    return y;
}
exports.h = h;
function i() {
    var x;
    x = 1;
    return x;
    x = "foo";
    return x;
}
exports.i = i;


//// [unreachableReturnStatementsVsInferredReturnTypes.d.ts]
export declare function g(): number;
export declare function h(): number;
export declare function i(): number;
