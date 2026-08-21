// @module: esnext
// @target: esnext
// @lib: esnext,dom
// @strict: true
// @noImplicitReferences: true

// @filename: a.wasm

// @filename: b.ts
import source a from "./a.wasm";
import { b } from "./a.wasm";

const c: WebAssembly.Module = a;
b;
