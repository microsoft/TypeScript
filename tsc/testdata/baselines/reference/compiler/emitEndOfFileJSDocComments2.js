//// [tests/cases/compiler/emitEndOfFileJSDocComments2.ts] ////

//// [emitEndOfFileJSDocComments2.js]
/** @typedef {number} A */

/**
 * JSDoc comment for function
 * @param {string} param - A string parameter
 * @returns {number} The length of the string
 */
function test(param) {
	// Comment inside function
	return param.length;
	/** @typedef {number} B2 */
}

// Single line comment
/** @typedef {number} C */
/**
 * Multiple line comment
 */


//// [emitEndOfFileJSDocComments2.js]
"use strict";
/** @typedef {number} A */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * JSDoc comment for function
 * @param {string} param - A string parameter
 * @returns {number} The length of the string
 */
function test(param) {
    // Comment inside function
    return param.length;
    /** @typedef {number} B2 */
}
// Single line comment
/** @typedef {number} C */
/**
 * Multiple line comment
 */
