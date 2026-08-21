// @module: esnext
// @target: esnext
// @lib: esnext,dom
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @noImplicitReferences: true

// @filename: a.wasm

// @filename: b.js
import source a from "./a.wasm";
const b = import.source("./a.wasm");

/** @type {WebAssembly.Module} */
const c = a;

/** @type {Promise<WebAssembly.Module>} */
const d = b;
