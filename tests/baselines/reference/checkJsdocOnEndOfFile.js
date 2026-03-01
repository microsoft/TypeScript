//// [tests/cases/conformance/jsdoc/checkJsdocOnEndOfFile.ts] ////

//// [eof.js]
/**
 * @typedef {Array<bad>} Should have error here
 */


//// [output.js]
"use strict";
/**
 * @typedef {Array<bad>} Should have error here
 */
