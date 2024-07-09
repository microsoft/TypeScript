//// [tests/cases/conformance/jsdoc/checkJsdocOnEndOfFile.ts] ////

//// [eof.js]
/**
 * @typedef {Array<bad>} Should have error here
 */


//// [output.js]
/**
 * @typedef {Array<bad>} Should have error here
 */
