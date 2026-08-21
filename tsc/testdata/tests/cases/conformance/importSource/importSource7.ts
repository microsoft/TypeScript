// @module: esnext
// @target: esnext
// @declaration: true
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
import source a from "./a.wasm";
export type B = typeof a;
export const b = import.source("./a.wasm");
