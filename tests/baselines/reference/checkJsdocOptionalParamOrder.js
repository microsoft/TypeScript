//// [tests/cases/conformance/jsdoc/checkJsdocOptionalParamOrder.ts] ////

//// [0.js]
// @ts-check
/**
 * @param {number} a
 * @param {number} [b]
 * @param {number} c
 */
function foo(a, b, c) {}


//// [0.js]
// @ts-check
/**
 * @param {number} a
 * @param {number} [b]
 * @param {number} c
 */
function foo(a, b, c) { }
