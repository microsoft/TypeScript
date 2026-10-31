//// [tests/cases/conformance/jsdoc/jsdocNeverUndefinedNull.ts] ////

//// [in.js]
/**
 * @param {never} p1
 * @param {undefined} p2
 * @param {null} p3
 * @returns {void} nothing
 */
function f(p1, p2, p3) {
}


//// [in.js]
"use strict";
/**
 * @param {never} p1
 * @param {undefined} p2
 * @param {null} p3
 * @returns {void} nothing
 */
function f(p1, p2, p3) {
}
