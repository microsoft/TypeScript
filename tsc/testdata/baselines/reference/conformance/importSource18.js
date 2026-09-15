//// [tests/cases/conformance/importSource/importSource18.ts] ////

//// [a.wasm]

//// [b.ts]
import source a from "./a.wasm";
import { b } from "./a.wasm";

const c: WebAssembly.Module = a;
b;


//// [b.js]
import source a from "./a.wasm";
import { b } from "./a.wasm";
const c = a;
b;
