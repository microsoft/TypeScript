//// [tests/cases/compiler/jsFileCompilationLetDeclarationOrder2.ts] ////

//// [a.ts]
let b = 30;
a = 10;
//// [b.js]
let a = 10;
b = 30;


//// [a.js]
"use strict";
let b = 30;
a = 10;
//// [b.js]
"use strict";
let a = 10;
b = 30;


//// [a.d.ts]
declare let b: number;
//// [b.d.ts]
declare let a: number;
