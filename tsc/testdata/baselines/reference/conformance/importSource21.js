//// [tests/cases/conformance/importSource/importSource21.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
import source a from "./a.wasm";
export { a };

//// [c.ts]
import source a from "././a.wasm";
export { a };

//// [d.ts]
export * from "./b.js";
export * from "./c.js";

//// [e.wasm]

//// [f.ts]
import source e from "./e.wasm";
export { e };

//// [g.ts]
import source e from "././e.wasm";
export { e };

//// [h.ts]
export * from "./f.js";
export * from "./g.js";

//// [i.ts]
import { a } from "./d.js";
import { e } from "./h.js";
const b: WebAssembly.Module = a;
const c: WebAssembly.Module = e;


//// [b.js]
import source a from "./a.wasm";
export { a };
//// [c.js]
import source a from "././a.wasm";
export { a };
//// [d.js]
export * from "./b.js";
export * from "./c.js";
//// [f.js]
import source e from "./e.wasm";
export { e };
//// [g.js]
import source e from "././e.wasm";
export { e };
//// [h.js]
export * from "./f.js";
export * from "./g.js";
//// [i.js]
import { a } from "./d.js";
import { e } from "./h.js";
const b = a;
const c = e;
