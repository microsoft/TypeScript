//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment7.ts] ////

//// [checkJsdocTypeTagOnExportAssignment7.js]

//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */

const abc = { a: 1, b: 1, c: 1 };

/** @type {Foo} */
export default abc;

//// [b.js]
import a from "./a";
a;


//// [checkJsdocTypeTagOnExportAssignment7.js]
//// [a.js]
/**
 * @typedef {Object} Foo
 * @property {number} a
 * @property {number} b
 */
const abc = { a: 1, b: 1, c: 1 };
/** @type {Foo} */
export default abc;
//// [b.js]
import a from "./a";
a;
