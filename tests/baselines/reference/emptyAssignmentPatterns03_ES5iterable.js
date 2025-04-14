//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns03_ES5iterable.ts] ////

//// [emptyAssignmentPatterns03_ES5iterable.ts]
var a: any;

({} = {} = a);
([] = [] = a);

//// [emptyAssignmentPatterns03_ES5iterable.js]
var a;
(a);
(a);


//// [emptyAssignmentPatterns03_ES5iterable.d.ts]
declare var a: any;
