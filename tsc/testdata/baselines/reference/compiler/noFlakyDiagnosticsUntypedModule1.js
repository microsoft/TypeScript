//// [tests/cases/compiler/noFlakyDiagnosticsUntypedModule1.ts] ////

//// [index.js]
exports.x = 1;
//// [index.js]
import { x } from "untyped";
x;


//// [index.js]
import { x } from "untyped";
x;


//// [index.d.ts]
export {};
