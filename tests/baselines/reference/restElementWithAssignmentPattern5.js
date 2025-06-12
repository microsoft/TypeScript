//// [tests/cases/conformance/es6/destructuring/restElementWithAssignmentPattern5.ts] ////

//// [restElementWithAssignmentPattern5.ts]
var s: string, s2: string;
[...[s, s2]] = ["", ""];

//// [restElementWithAssignmentPattern5.js]
var s, s2;
[...[s, s2]] = ["", ""];
