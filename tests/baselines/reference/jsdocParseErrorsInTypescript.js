//// [tests/cases/conformance/jsdoc/jsdocParseErrorsInTypescript.ts] ////

//// [jsdocParseErrorsInTypescript.ts]
// parse error (blocks grammar errors from checker)
function parse1(n: number=) { }


//// [jsdocParseErrorsInTypescript.js]
"use strict";
// parse error (blocks grammar errors from checker)
function parse1(n) {
    if (n === void 0) { n = ; }
}
