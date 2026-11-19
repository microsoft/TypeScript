//// [tests/cases/compiler/signatureHelpInferenceQueryOrder.ts] ////

//// [signatureHelpInferenceQueryOrder.ts]
function f<T, U>(y: T, y1: U, p: (z: U) => T, p1: (x: T) => U): [T, U] { return [y, p1(y)]; }
interface A { a: A; }
interface B extends A { b; }

declare var a: A, b: B;

var d = f(a, b, x => x, x => x);


//// [signatureHelpInferenceQueryOrder.js]
"use strict";
function f(y, y1, p, p1) { return [y, p1(y)]; }
var d = f(a, b, x => x, x => x);
