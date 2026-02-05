//// [tests/cases/compiler/assignmentToObject.ts] ////

//// [assignmentToObject.ts]
var a = { toString: 5 };
var b: {} = a;  // ok
var c: Object = a;  // should be error


//// [assignmentToObject.js]
"use strict";
var a = { toString: 5 };
var b = a; // ok
var c = a; // should be error
