//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns01_ES5.ts] ////

//// [emptyAssignmentPatterns01_ES5.ts]
var a: any;

({} = a);
([] = a);

var [,] = [1,2];

//// [emptyAssignmentPatterns01_ES5.js]
var _a;
var a;
(a);
(a);
var _b = (_a = [1, 2], _b[0], _a);


//// [emptyAssignmentPatterns01_ES5.d.ts]
declare var a: any;
