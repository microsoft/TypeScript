//// [tests/cases/compiler/jsDocTypedefTagNamespace.ts] ////

//// [a.js]
/** @typedef {number} NS.T */
/** @typedef {string} NS.U */

/** @type {NS.T} */
const x = 1;

/** @type {NS.U} */
const y = "hello";

//// [b.js]
/** @typedef {{age: number}} A.B.MyType */

/** @type {A.B.MyType} */
const z = { age: 42 };

//// [c.js]
/** @callback NS.MyCallback
 * @param {string} name
 * @returns {void}
 */

/** @type {NS.MyCallback} */
const f = (name) => {};

//// [d.js]
/** @typedef {number} M.T */

/** @type {M.T} */
export const xd = 1;

//// [e.js]
import { xd } from "./d.js";
/** @type {import("./d.js").M.T} */
export const ed = xd;


//// [a.js]
"use strict";
/** @typedef {number} NS.T */
/** @typedef {string} NS.U */
/** @type {NS.T} */
const x = 1;
/** @type {NS.U} */
const y = "hello";
//// [b.js]
"use strict";
/** @typedef {{age: number}} A.B.MyType */
/** @type {A.B.MyType} */
const z = { age: 42 };
//// [c.js]
"use strict";
/** @callback NS.MyCallback
 * @param {string} name
 * @returns {void}
 */
/** @type {NS.MyCallback} */
const f = (name) => { };
//// [d.js]
/** @typedef {number} M.T */
/** @type {M.T} */
export const xd = 1;
//// [e.js]
import { xd } from "./d.js";
/** @type {import("./d.js").M.T} */
export const ed = xd;
