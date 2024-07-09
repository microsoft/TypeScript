//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsMissingGenerics.ts] ////

//// [file.js]
/**
 * @param {Array} x
 */
function x(x) {}
/**
 * @param {Promise} x
 */
function y(x) {}

//// [file.js]
/**
 * @param {Array} x
 */
function x(x) { }
/**
 * @param {Promise} x
 */
function y(x) { }


//// [file.d.ts]
/**
 * @param {Array} x
 */
declare function x(x: any[]): void;
/**
 * @param {Promise} x
 */
declare function y(x: Promise<any>): void;
