//// [tests/cases/conformance/importSource/importSource9.ts] ////

//// [b.ts]
import source a from "./a.wasm";
export { a };

//// [c.ts]
import { a } from "./b.js";
const b: AbstractModuleSource = a;

//// [d.ts]
import * as a from "./b.js";
const b: AbstractModuleSource = a.a;

//// [e.ts]
import source a from "./a.wasm";
export type B = typeof a;
export const b = import.source("./a.wasm");


//// [b.js]
import source a from "./a.wasm";
export { a };
//// [c.js]
import { a } from "./b.js";
const b = a;
//// [d.js]
import * as a from "./b.js";
const b = a.a;
//// [e.js]
export const b = import.source("./a.wasm");


//// [b.d.ts]
import source a from "./a.wasm";
export { a };
//// [c.d.ts]
export {};
//// [d.d.ts]
export {};
//// [e.d.ts]
import source a from "./a.wasm";
export type B = typeof a;
export declare const b: Promise<AbstractModuleSource>;
