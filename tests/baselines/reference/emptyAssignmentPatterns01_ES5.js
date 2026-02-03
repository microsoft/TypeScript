//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns01_ES5.ts] ////

//// [emptyAssignmentPatterns01_ES5.ts]
var a: any;

({} = a);
([] = a);

var [,] = [1,2];

//// [emptyAssignmentPatterns01_ES5.js]
var a;
(a);
(a);
var _a = [1, 2];


//// [emptyAssignmentPatterns01_ES5.d.ts]
declare var a: any;
