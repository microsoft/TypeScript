// @checkJs: true
// @allowJs: true
// @strict: true
// @outDir: ./out

// @filename: a.js
/** @typedef {number} NS.T */
/** @typedef {string} NS.U */

/** @type {NS.T} */
const x = 1;

/** @type {NS.U} */
const y = "hello";

// @filename: b.js
/** @typedef {{age: number}} A.B.MyType */

/** @type {A.B.MyType} */
const z = { age: 42 };

// @filename: c.js
/** @callback NS.MyCallback
 * @param {string} name
 * @returns {void}
 */

/** @type {NS.MyCallback} */
const f = (name) => {};

// @filename: d.js
/** @typedef {number} M.T */

/** @type {M.T} */
export const xd = 1;

// @filename: e.js
import { xd } from "./d.js";
/** @type {import("./d.js").M.T} */
export const ed = xd;
