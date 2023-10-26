//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns03_ES6.ts] ////

//// [emptyAssignmentPatterns03_ES6.ts]
var a: any;

({} = {} = a);
([] = [] = a);

//// [emptyAssignmentPatterns03_ES6.js]
var a;
({} = {} = a);
([] = [] = a);


//// [emptyAssignmentPatterns03_ES6.d.ts]
declare var a: any;
