//// [tests/cases/compiler/jsFileCompilationDuplicateVariable.ts] ////

//// [a.ts]
var x = 10;

//// [b.js]
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [out.js]
var x = 10;
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [out.d.ts]
declare var x: number;
declare var x: string;
