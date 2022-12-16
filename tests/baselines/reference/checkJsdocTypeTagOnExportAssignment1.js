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
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {Foo} */
exports.default = { c: false };
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
a_1.default;
