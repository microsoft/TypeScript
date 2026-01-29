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
