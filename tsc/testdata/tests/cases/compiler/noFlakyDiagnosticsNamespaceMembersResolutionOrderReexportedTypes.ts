// @strict: true
// @module: commonjs
// @target: es2020
// @allowJs: true
// @checkJs: false
// @skipLibCheck: true
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

// @Filename: /ia2.d.ts
export { v } from "./ia";
export type v = number;

// @Filename: /ib2.d.ts
export { v } from "./ib";
export type v = number;

// @Filename: /index.d.ts
export { v as a } from "./ia2";
export { v as b } from "./ib2";
export const f1: 1;
export const f2: 2;
export const f3: 3;
export const f4: 4;
export const f5: 5;
export const f6: 6;
export const f7: 7;
export const f8: 8;
export const f9: 9;
export const f10: 10;

// @Filename: /index2.d.ts
export { v as a } from "./ia2";
export { v as b } from "./ib2";

// @Filename: /d.d.ts
export * from "./index";
export * from "./index2";

// @Filename: /main.ts
import * as idx from "./d";
const all = { ...idx };
import * as MA from "./ma";
import * as MB from "./mb";
export const fromA = MA.pa;
export const fromB = MB.pb;
export const checkA: 1 = MA.pa.mb;
export const checkB: 1 = MB.pb.ma;
