//// [tests/cases/conformance/es6/destructuring/restElementWithAssignmentPattern3.ts] ////

//// [restElementWithAssignmentPattern3.ts]
var a: string, b: number;
var tuple: [string, number] = ["", 1];
[...[a, b = 0]] = tuple;

//// [restElementWithAssignmentPattern3.js]
var a, b;
var tuple = ["", 1];
[...[a, b = 0]] = tuple;
