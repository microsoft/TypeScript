//// [tests/cases/compiler/noFlakyDiagnosticsUntypedModule2.ts] ////

//// [untyped.js]
exports.x = 1;
//// [index.ts]
// @ts-expect-error
import { x } from "./untyped";
x;


//// [index.js]
// @ts-expect-error
import { x } from "./untyped";
x;


//// [index.d.ts]
export {};
