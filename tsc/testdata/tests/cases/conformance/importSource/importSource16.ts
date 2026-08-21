// @module: esnext
// @target: esnext
// @lib: esnext,dom
// @strict: true
// @declaration: true
// @noImplicitReferences: true

// @filename: a.wasm

// @filename: b.ts
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
export type B = typeof a;
export { a };

export const c = import.source("./a.wasm");
const d: Promise<WebAssembly.Module> = c;

// @filename: c.ts
import { a, c } from "./b.js";
const e: WebAssembly.Module = a;
const f: Promise<WebAssembly.Module> = c;
