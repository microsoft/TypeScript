//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment3.ts] ////

//// [checkJsdocTypeTagOnExportAssignment3.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

const bar = { c: 1 };

/** @type {Foo} */
export default bar;

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment3.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */
exports.__esModule = true;
var bar = { c: 1 };
/** @type {Foo} */
exports["default"] = bar;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
a_1["default"];
