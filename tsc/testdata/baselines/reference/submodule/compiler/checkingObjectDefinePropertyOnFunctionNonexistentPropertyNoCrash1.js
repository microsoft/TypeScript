//// [tests/cases/compiler/checkingObjectDefinePropertyOnFunctionNonexistentPropertyNoCrash1.ts] ////

//// [index.js]
export function test(fn) {
  const composed = function (...args) { }

  Object.defineProperty(composed, 'name', {
    value: composed.fn + '_test'
  })

  return composed
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = test;
function test(fn) {
    const composed = function (...args) { };
    Object.defineProperty(composed, 'name', {
        value: composed.fn + '_test'
    });
    return composed;
}


//// [index.d.ts]
export declare function test(fn: any): (...args: any[]) => void;
