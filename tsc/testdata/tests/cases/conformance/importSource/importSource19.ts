// @module: esnext
// @target: esnext
// @lib: esnext,dom
// @strict: true

// @filename: a.ts
import source a from "./missing.wasm";
const b = import.source("./missing.wasm");

a;
b;
