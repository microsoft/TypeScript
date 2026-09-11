//// [tests/cases/conformance/importSource/importSource10.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
import source a from "./a.wasm";
export { a };

//// [c.ts]
import { a } from "./b.js";
const b: WebAssembly.Module = a;

//// [d.ts]
import * as a from "./b.js";
const b: WebAssembly.Module = a.a;


//// [b.js]
import source a from "./a.wasm";
export { a };
//// [c.js]
import { a } from "./b.js";
const b = a;
//// [d.js]
import * as a from "./b.js";
const b = a.a;


//// [b.d.ts]
import source a from "./a.wasm";
export { a };
//// [c.d.ts]
export {};
//// [d.d.ts]
export {};
