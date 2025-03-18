//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns02_ES5.ts] ////

//// [emptyAssignmentPatterns02_ES5.ts]
var a: any;
let x, y, z, a1, a2, a3;

({} = { x, y, z } = a);
([] = [ a1, a2, a3] = a);

//// [emptyAssignmentPatterns02_ES5.js]
var a;
let x, y, z, a1, a2, a3;
({} = { x, y, z } = a);
([] = [a1, a2, a3] = a);
