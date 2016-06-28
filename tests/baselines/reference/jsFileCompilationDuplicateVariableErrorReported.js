//// [tests/cases/compiler/jsFileCompilationDuplicateVariableErrorReported.ts] ////

//// [b.js]
var x = "hello";

//// [a.ts]
var x = 10; // Error reported so no declaration file generated?

//// [out.js]
var x = "hello";
var x = 10; // Error reported so no declaration file generated?


//// [out.d.ts]
declare var x: string;
