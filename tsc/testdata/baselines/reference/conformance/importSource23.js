//// [tests/cases/conformance/importSource/importSource23.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
import source a from "./a.d.wasm.ts";
a;
import.source("./a.d.wasm.ts");


//// [b.js]
import source a from "./a.d.wasm.ts";
a;
import.source("./a.d.wasm.ts");
