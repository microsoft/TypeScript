//// [tests/cases/compiler/jsFileCompilationDuplicateVariableErrorReported.ts] ////

//// [b.js]
var x = "hello";

//// [a.ts]
var x = 10; // Error reported


//// [out.js]
var x = "hello";
var x = 10; // Error reported


//// [out.d.ts]
declare var x: string;
declare var x: string;
