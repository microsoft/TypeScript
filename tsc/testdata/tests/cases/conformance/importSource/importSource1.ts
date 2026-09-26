// @module: esnext, preserve
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
import source a from "./a.wasm";
const b: WebAssembly.Module = a;

// @filename: c.ts
import source a from "./a.wasm" with { type: "webassembly" };
const b: WebAssembly.Module = a;
