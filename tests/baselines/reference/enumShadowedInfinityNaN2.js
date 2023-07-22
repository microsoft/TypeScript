//// [tests/cases/conformance/enums/enumShadowedInfinityNaN2.ts] ////

//// [enumShadowedInfinityNaN2.ts]
// repro https://github.com/microsoft/TypeScript/issues/55091

let Infinity = 3;
let NaN = 5;

export enum A {
    X = 1 / 0,
    Y = -1 / 0,
    B = 0 / 0,
}


//// [enumShadowedInfinityNaN2.js]
"use strict";
// repro https://github.com/microsoft/TypeScript/issues/55091
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var Infinity = 3;
var NaN = 5;
var A;
(function (A) {
    A[A["X"] = 1 / 0] = "X";
    A[A["Y"] = -1 / 0] = "Y";
    A[A["B"] = 0 / 0] = "B";
})(A || (exports.A = A = {}));
