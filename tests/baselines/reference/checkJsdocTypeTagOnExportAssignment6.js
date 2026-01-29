//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment6.ts] ////

//// [checkJsdocTypeTagOnExportAssignment6.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

/** @type {Foo} */
export default { a: 1, b: 1, c: 1 };

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment6.js]
//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */
/** @type {Foo} */
export default { a: 1, b: 1, c: 1 };
//// [b.js]
import a from "./a";
a;
