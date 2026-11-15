// @module: commonjs
// @allowJs: true
// @checkJs: false
// @declaration: true
// @outDir: /out
// @checkers: 1

// @Filename: /ma.js
export { v as pa } from "./xa";
export const ma = 1;

// @Filename: /mb.js
export { v as pb } from "./xb";
export const mb = 1;

// @Filename: /xa.js
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

// @Filename: /xb.js
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

// @Filename: /a.ts
import * as MA from "./ma";
export const fromA = MA.pa;

// @Filename: /b.ts
import * as MB from "./mb";
export const fromB = MB.pb;

// @Filename: /c.ts
export const c = 1;
