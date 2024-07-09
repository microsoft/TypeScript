//// [tests/cases/conformance/es6/destructuring/restElementWithAssignmentPattern2.ts] ////

//// [restElementWithAssignmentPattern2.ts]
var a: string, b: number;
[...{ 0: a = "", b }] = ["", 1];

//// [restElementWithAssignmentPattern2.js]
var a, b;
[...{ 0: a = "", b }] = ["", 1];
