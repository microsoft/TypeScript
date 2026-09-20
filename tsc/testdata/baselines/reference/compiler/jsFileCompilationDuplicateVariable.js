//// [tests/cases/compiler/jsFileCompilationDuplicateVariable.ts] ////

//// [a.ts]
var x = 10;

//// [b.js]
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [a.js]
"use strict";
var x = 10;
//// [b.js]
"use strict";
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [a.d.ts]
declare var x: number;
//// [b.d.ts]
declare var x: number;
