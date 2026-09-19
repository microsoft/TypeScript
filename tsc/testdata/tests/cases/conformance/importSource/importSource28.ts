// @module: esnext
// @target: esnext
// @strict: true
// @noEmit: true
// @noImplicitReferences: true
// @lib: esnext,dom

// @filename: a.d.ts
export {};

// @filename: a.js
export {};

// @filename: b.d.mts
export {};

// @filename: b.mjs
export {};

// @filename: c.d.cts
export {};

// @filename: c.cjs
exports.value = 1;

// @filename: d.d.wasm.ts
export {};

// @filename: index.ts
import source a from "./a.d.ts";
import source b from "./b.d.mts";
import source c from "./c.d.cts";
import source d from "./d.d.wasm.ts";
export { a, b, c, d };

import.source("./a.d.ts");
import.source("./b.d.mts");
import.source("./c.d.cts");
import.source("./d.d.wasm.ts");

import source valid from "./d.wasm";
const module: WebAssembly.Module = valid;
const wrong: string = valid;
const promise: Promise<WebAssembly.Module> = import.source("./d.wasm");
