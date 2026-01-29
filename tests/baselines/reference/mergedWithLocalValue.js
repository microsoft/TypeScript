//// [tests/cases/conformance/externalModules/typeOnly/mergedWithLocalValue.ts] ////

//// [a.ts]
export type A = "a";

//// [b.ts]
import type { A } from "./a";
const A: A = "a";
A.toUpperCase();


//// [a.js]
export {};
//// [b.js]
const A = "a";
A.toUpperCase();
export {};
