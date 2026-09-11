// @module: esnext
// @target: esnext

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
import source a from "./a.d.wasm.ts";
a;
import.source("./a.d.wasm.ts");
