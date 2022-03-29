//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment8.ts] ////

//// [checkJsdocTypeTagOnExportAssignment8.js]

//// [a.js]
/**
 * @typedef Foo
 * @property {string} a
 * @property {'b'} b
 */

/** @type {Foo} */
export default {
    a: 'a',
    b: 'b'
}


//// [checkJsdocTypeTagOnExportAssignment8.js]
//// [a.js]
"use strict";
/**
 * @typedef Foo
 * @property {string} a
 * @property {'b'} b
 */
exports.__esModule = true;
/** @type {Foo} */
exports["default"] = {
    a: 'a',
    b: 'b'
};
