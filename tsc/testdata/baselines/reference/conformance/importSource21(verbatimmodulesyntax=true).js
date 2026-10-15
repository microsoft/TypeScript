//// [tests/cases/conformance/importSource/importSource21.ts] ////

//// [index.ts]
import source a from "./a.wasm";
import source b from "./b.wasm";
import source c from "./c.wasm";
export type A = typeof a;
export const d = c;


//// [index.js]
import source a from "./a.wasm";
import source b from "./b.wasm";
import source c from "./c.wasm";
export const d = c;


//// [index.d.ts]
import source a from "./a.wasm";
export type A = typeof a;
export declare const d: AbstractModuleSource;
