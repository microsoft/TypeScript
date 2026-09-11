//// [tests/cases/conformance/importSource/importSource7.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
import source a from "./a.wasm";
export type B = typeof a;
export const b = import.source("./a.wasm");


//// [b.js]
export const b = import.source("./a.wasm");


//// [b.d.ts]
import source a from "./a.wasm";
export type B = typeof a;
export declare const b: Promise<WebAssembly.Module>;
