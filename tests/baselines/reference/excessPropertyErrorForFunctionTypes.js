//// [tests/cases/compiler/excessPropertyErrorForFunctionTypes.ts] ////

//// [excessPropertyErrorForFunctionTypes.ts]
type FunctionType = () => any;
type DoesntWork = { a: number, c: number } | FunctionType;

let doesntWork: DoesntWork = { a: 1, c: 2, d: 3 }

//// [excessPropertyErrorForFunctionTypes.js]
"use strict";
let doesntWork = { a: 1, c: 2, d: 3 };
