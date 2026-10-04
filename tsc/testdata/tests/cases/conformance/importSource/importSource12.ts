// @module: esnext
// @target: esnext
// @lib: esnext
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @noImplicitReferences: true

// @filename: b.js
import source a from "./a.wasm";
const b = import.source("./a.wasm");

/** @type {AbstractModuleSource} */
const c = a;

/** @type {Promise<AbstractModuleSource>} */
const d = b;
