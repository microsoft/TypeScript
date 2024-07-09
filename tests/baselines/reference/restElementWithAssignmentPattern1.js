//// [tests/cases/conformance/es6/destructuring/restElementWithAssignmentPattern1.ts] ////

//// [restElementWithAssignmentPattern1.ts]
var a: string, b: number;
[...[a, b = 0]] = ["", 1];

//// [restElementWithAssignmentPattern1.js]
var a, b;
[...[a, b = 0]] = ["", 1];
