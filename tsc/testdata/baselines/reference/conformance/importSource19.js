//// [tests/cases/conformance/importSource/importSource19.ts] ////

//// [a.ts]
import source a from "./missing.wasm";
const b = import.source("./missing.wasm");

a;
b;


//// [a.js]
import source a from "./missing.wasm";
const b = import.source("./missing.wasm");
a;
b;
