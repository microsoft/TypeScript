//// [tests/cases/compiler/jsFileCompilationDuplicateVariable.ts] ////

//// [a.ts]
var x = 10;

//// [b.js]
var x = "hello"; // No error is recorded here and declaration file will show this as number

//// [out.js]
var x = 10;
var x = "hello"; // No error is recorded here and declaration file will show this as number


//// [out.d.ts]
declare var x: number;
