//// [tests/cases/conformance/es6/destructuring/restElementWithAssignmentPattern3.ts] ////

//// [restElementWithAssignmentPattern3.ts]
var a: string, b: number;
var tuple: [string, number] = ["", 1];
[...[a, b = 0]] = tuple;

//// [restElementWithAssignmentPattern3.js]
var _a, _b;
var a, b;
var tuple = ["", 1];
_a = tuple.slice(0), a = _a[0], _b = _a[1], b = _b === void 0 ? 0 : _b;
