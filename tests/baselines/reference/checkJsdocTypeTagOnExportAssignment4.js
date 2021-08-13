//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment4.ts] ////

//// [checkJsdocTypeTagOnExportAssignment4.js]

//// [a.js]
/**
 * @typedef {number} Foo
 */

/** @type {Foo} */
export default "";



//// [checkJsdocTypeTagOnExportAssignment4.js]
//// [a.js]
"use strict";
/**
 * @typedef {number} Foo
 */
exports.__esModule = true;
/** @type {Foo} */
exports["default"] = "";
