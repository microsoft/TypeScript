// @checkOrder: default, reverse, isolated, typesfirst
// @strict: true
// @module: commonjs
// @target: es2020
// @allowJs: true
// @declaration: true
// @outDir: /out
// @noImplicitReferences: true

// @Filename: /ma.js
export { v as pa } from "./xa";
export const ma = 1;

// @Filename: /mb.js
export { v as pb } from "./xb";
export const mb = 1;

// @Filename: /xa.js
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };

// @Filename: /xb.js
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };

// @Filename: /ia.js
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
module.exports = { v: { ...M } };
