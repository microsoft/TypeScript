//// [tests/cases/compiler/es6ExportAssignment3.ts] ////

//// [a.d.ts]
declare var a: number;
export = a;  // OK, in ambient context

//// [b.ts]
import * as a from "a";


//// [b.js]
export {};
