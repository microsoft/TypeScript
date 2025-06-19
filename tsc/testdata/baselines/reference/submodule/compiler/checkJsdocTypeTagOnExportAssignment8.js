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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Foo
 * @property {string} a
 * @property {'b'} b
 */
/** @type {Foo} */
exports.default = {
    a: 'a',
    b: 'b'
};
