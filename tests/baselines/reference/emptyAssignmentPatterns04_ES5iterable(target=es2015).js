//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns04_ES5iterable.ts] ////

//// [emptyAssignmentPatterns04_ES5iterable.ts]
var a: any;
let x, y, z, a1, a2, a3;

({ x, y, z } = {} = a);
([ a1, a2, a3] = [] = a);

//// [emptyAssignmentPatterns04_ES5iterable.js]
var a;
let x, y, z, a1, a2, a3;
({ x, y, z } = {} = a);
([a1, a2, a3] = [] = a);


//// [emptyAssignmentPatterns04_ES5iterable.d.ts]
declare var a: any;
declare let x: any, y: any, z: any, a1: any, a2: any, a3: any;
