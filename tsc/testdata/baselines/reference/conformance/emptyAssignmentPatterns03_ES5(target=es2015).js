//// [tests/cases/conformance/es6/destructuring/emptyAssignmentPatterns03_ES5.ts] ////

//// [emptyAssignmentPatterns03_ES5.ts]
var a: any;

({} = {} = a);
([] = [] = a);

//// [emptyAssignmentPatterns03_ES5.js]
"use strict";
var a;
({} = {} = a);
([] = [] = a);


//// [emptyAssignmentPatterns03_ES5.d.ts]
declare var a: any;
