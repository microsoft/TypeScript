//// [tests/cases/compiler/outExtensionInferFromModuleESM.ts] ////

//// [input-1.ts]
export const ts = "foo";

//// [input-2.mts]
export const mts = "foo";

//// [input-3.cts]
export const cts = "foo";

//// [input-4.js]
export const js = "foo";

//// [input-5.mjs]
export const mjs = "foo";

//// [input-6.cjs]
export const cjs = "foo";


//// [input-1.mjs]
export var ts = "foo";
//// [input-2.mjs]
export var mts = "foo";
//// [input-3.mjs]
export var cts = "foo";
//// [input-4.mjs]
export var js = "foo";
//// [input-5.mjs]
export var mjs = "foo";
//// [input-6.mjs]
export var cjs = "foo";
