//// [tests/cases/conformance/jsdoc/seeTag4.ts] ////

//// [seeTag4.js]
/**
 * @typedef {any} A
 */

/**
 * @see {@link A}
 * @see {@linkcode A}
 * @see {@linkplain A}
 */
let foo;


//// [seeTag4.js]
/**
 * @typedef {any} A
 */
/**
 * @see {@link A}
 * @see {@linkcode A}
 * @see {@linkplain A}
 */
var foo;
