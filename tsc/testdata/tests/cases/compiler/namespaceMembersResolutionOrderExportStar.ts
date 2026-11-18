// @strict: true
// @module: commonjs
// @target: es2020
// @allowJs: true
// @checkJs: false
// @declaration: true
// @outDir: /out
// @noImplicitReferences: true
// @singleThreaded: true

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

// @Filename: /ia.js
/** @type {typeof import("./ma")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

// @Filename: /ib.js
/** @type {typeof import("./mb")} */
const M = /** @type {any} */ (null);
const o = { v: { ...M } };
module.exports = o;

// @Filename: /star.js
export { v as a } from "./ia";

// @Filename: /index.js
export { v as b } from "./ib";
export * from "./star";
export const f1 = 1;
export const f2 = 2;
export const f3 = 3;
export const f4 = 4;
export const f5 = 5;
export const f6 = 6;
export const f7 = 7;
export const f8 = 8;
export const f9 = 9;
export const f10 = 10;

// @Filename: /main.ts
import * as idx from "./index";
const all = { ...idx };
import * as MA from "./ma";
import * as MB from "./mb";
export const fromA = MA.pa;
export const fromB = MB.pb;
export const checkA: 1 = MA.pa.mb;
export const checkB: 1 = MB.pb.ma;
