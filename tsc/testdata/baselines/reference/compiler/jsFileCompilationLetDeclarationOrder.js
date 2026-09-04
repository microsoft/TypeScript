//// [tests/cases/compiler/jsFileCompilationLetDeclarationOrder.ts] ////

//// [b.js]
let a = 10;
b = 30;

//// [a.ts]
let b = 30;
a = 10;


//// [b.js]
"use strict";
let a = 10;
b = 30;
//// [a.js]
"use strict";
let b = 30;
a = 10;


//// [b.d.ts]
declare let a: number;
//// [a.d.ts]
declare let b: number;
