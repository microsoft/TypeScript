//// [tests/cases/conformance/importSource/importSource18.ts] ////

//// [index.ts]
import source a from "./a.wasm";
a;
import.source("./a.wasm");


//// [index.js]
import source a from "./a.wasm";
a;
import.source("./a.wasm");
