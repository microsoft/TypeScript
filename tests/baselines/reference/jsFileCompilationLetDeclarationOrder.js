//// [tests/cases/compiler/jsFileCompilationLetDeclarationOrder.ts] ////

//// [b.js]
let a = 10;
b = 30;

//// [a.ts]
let b = 30;
a = 10;


//// [out.js]
var a = 10;
b = 30;
var b = 30;
a = 10;


//// [out.d.ts]
declare let a: number;
declare let b: number;
