//// [tests/cases/conformance/externalModules/typeOnly/cjsImportInES2015.ts] ////

//// [index.d.ts]
declare class SpecialError extends Error {}
export = SpecialError;

//// [index.ts]
import type SpecialError = require("cjs-dep");
function handleError(err: SpecialError) {}


//// [index.js]
function handleError(err) { }
export {};
