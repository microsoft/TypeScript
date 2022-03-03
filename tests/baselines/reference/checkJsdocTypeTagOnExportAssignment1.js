//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment1.ts] ////

//// [checkJsdocTypeTagOnExportAssignment1.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */

/** @type {Foo} */
export default { c: false };

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment1.js]
//// [a.js]
"use strict";
/**
 * @typedef {Object} Foo
 * @property {boolean} a
 * @property {boolean} b
 */
exports.__esModule = true;
/** @type {Foo} */
exports["default"] = { c: false };
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
a_1["default"];
