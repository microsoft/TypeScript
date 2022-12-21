//// [tests/cases/compiler/es6ExportAssignment2.ts] ////

//// [a.ts]
var a = 10;
export = a;  // Error: export = not allowed in ES6

//// [b.ts]
import * as a from "a";


//// [a.js]
var a = 10;
export {};
//// [b.js]
export {};
