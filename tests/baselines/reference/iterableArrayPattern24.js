//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern24.ts] ////

//// [iterableArrayPattern24.ts]
var a: string, b: boolean[];
[a, ...b] = { 0: "", 1: true };

//// [iterableArrayPattern24.js]
var a, b;
[a, ...b] = { 0: "", 1: true };
