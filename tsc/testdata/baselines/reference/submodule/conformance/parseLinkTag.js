//// [tests/cases/conformance/jsdoc/parseLinkTag.ts] ////

//// [parseLinkTag.ts]
/** trailing @link tag {@link */
var x;
/** @returns trailing @link tag {@link */
function f() {
    return x
}


//// [parseLinkTag.js]
"use strict";
/** trailing @link tag {@link */
var x;
/** @returns trailing @link tag {@link */
function f() {
    return x;
}
