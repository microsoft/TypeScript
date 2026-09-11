// @module: nodenext
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.mts
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");

// @filename: c.cts
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");
