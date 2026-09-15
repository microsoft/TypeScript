//// [tests/cases/conformance/importSource/importSource16.ts] ////

//// [a.wasm]

//// [b.ts]
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
export type B = typeof a;
export { a };

export const c = import.source("./a.wasm");
const d: Promise<WebAssembly.Module> = c;

//// [c.ts]
import { a, c } from "./b.js";
const e: WebAssembly.Module = a;
const f: Promise<WebAssembly.Module> = c;


//// [b.js]
import source a from "./a.wasm";
const b = a;
export { a };
export const c = import.source("./a.wasm");
const d = c;
//// [c.js]
import { a, c } from "./b.js";
const e = a;
const f = c;


//// [b.d.ts]
import source a from "./a.wasm";
export type B = typeof a;
export { a };
export declare const c: Promise<WebAssembly.Module>;
//// [c.d.ts]
export {};
