//// [tests/cases/conformance/jsdoc/parseThrowsTag.ts] ////

//// [parseThrowsTag.ts]
/** @throws {Error} comment */
function f() {}


//// [parseThrowsTag.js]
function f() { }
