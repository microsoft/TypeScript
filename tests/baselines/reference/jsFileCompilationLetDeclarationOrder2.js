//// [tests/cases/compiler/jsFileCompilationLetDeclarationOrder2.ts] ////

//// [a.ts]
let b = 30;
a = 10;
//// [b.js]
let a = 10;
b = 30;


//// [out.js]
let b = 30;
a = 10;
let a = 10;
b = 30;


//// [out.d.ts]
declare let b: number;
declare let a: number;
