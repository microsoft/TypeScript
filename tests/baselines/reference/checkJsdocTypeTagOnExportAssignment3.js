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
