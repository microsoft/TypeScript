//// [tests/cases/compiler/noFlakyDiagnosticsUntypedModule3.ts] ////

//// [untyped.mjs]
export const x = 1;
//// [index.mts]
// @ts-expect-error
import { x } from "./untyped.mjs";
x;


//// [index.mjs]
// @ts-expect-error
import { x } from "./untyped.mjs";
x;


//// [index.d.mts]
export {};
