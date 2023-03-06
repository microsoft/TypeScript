//// [tests/cases/conformance/externalModules/typeOnly/preserveValueImports_importsNotUsedAsValues.ts] ////

//// [mod.ts]
export type A = unknown;
export type B = never;
export type C = any;

//// [index.ts]
import { type A, type B, type C } from "./mod.js";

//// [reexport.ts]
export { type A, type B, type C } from "./mod.js";


//// [mod.js]
export {};
//// [index.js]
import {} from "./mod.js";
//// [reexport.js]
export {} from "./mod.js";
