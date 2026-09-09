//// [tests/cases/compiler/jsFileCompilationDuplicateVariableErrorReported.ts] ////

//// [b.js]
var x = "hello";

//// [a.ts]
var x = 10; // Error reported


//// [b.js]
"use strict";
var x = "hello";
//// [a.js]
"use strict";
var x = 10; // Error reported


//// [b.d.ts]
declare var x: string;
//// [a.d.ts]
declare var x: string;
