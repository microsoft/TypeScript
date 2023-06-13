//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern23.ts] ////

//// [iterableArrayPattern23.ts]
var a: string, b: boolean;
[a, b] = { 0: "", 1: true };

//// [iterableArrayPattern23.js]
var a, b;
[a, b] = { 0: "", 1: true };
