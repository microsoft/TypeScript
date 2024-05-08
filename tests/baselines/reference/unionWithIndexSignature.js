//// [tests/cases/compiler/unionWithIndexSignature.ts] ////

//// [unionWithIndexSignature.ts]
interface NumList {
  kind: 'n';
  [x: number]: number;
}
interface StrList {
  kind: 's';
  [x: number]: string;
}

export function foo<T extends NumList | StrList>(arr: T & (NumList | StrList)) {
  let zz = arr[1];  // Error
}

// Repro from #38102

export type TypedArray = Int32Array | Uint8Array;

export function isTypedArray(a: {}): a is Int32Array | Uint8Array {
  return a instanceof Int32Array || a instanceof Uint8Array;
}

export function flatten<T extends number|TypedArray>(arr: T) {
  if (isTypedArray(arr)) {
      arr[1];
  }
}


//// [unionWithIndexSignature.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.isTypedArray = isTypedArray;
exports.flatten = flatten;
function foo(arr) {
    var zz = arr[1]; // Error
}
function isTypedArray(a) {
    return a instanceof Int32Array || a instanceof Uint8Array;
}
function flatten(arr) {
    if (isTypedArray(arr)) {
        arr[1];
    }
}
