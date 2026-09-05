// @module: esnext
// @target: esnext
// @declaration: true
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
import source a from "./a.wasm";
export { a };

// @filename: c.ts
import { a } from "./b.js";
const b: WebAssembly.Module = a;

// @filename: d.ts
import * as a from "./b.js";
const b: WebAssembly.Module = a.a;
