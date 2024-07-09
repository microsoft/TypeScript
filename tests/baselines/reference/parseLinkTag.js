//// [tests/cases/conformance/jsdoc/parseLinkTag.ts] ////

//// [parseLinkTag.ts]
/** trailing @link tag {@link */
var x;
/** @returns trailing @link tag {@link */
function f() {
    return x
}


//// [parseLinkTag.js]
/** trailing @link tag {@link */
var x;
/** @returns trailing @link tag {@link */
function f() {
    return x;
}
