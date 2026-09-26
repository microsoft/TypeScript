//// [tests/cases/conformance/importSource/importSource1.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
import source a from "./a.wasm";
const b: WebAssembly.Module = a;

//// [c.ts]
import source a from "./a.wasm" with { type: "webassembly" };
const b: WebAssembly.Module = a;


//// [b.js]
import source a from "./a.wasm";
const b = a;
//// [c.js]
import source a from "./a.wasm" with { type: "webassembly" };
const b = a;
