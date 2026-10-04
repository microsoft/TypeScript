// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @target: es2022
// @module: esnext
// @moduleResolution: bundler

// @filename: repro.js
const M = /** @type {any} */ ({});
/** @typedef {number} Foo */
export const a = M.await(1);
