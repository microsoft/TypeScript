//// [tests/cases/conformance/es6/templates/templateStringInYieldKeyword.ts] ////

//// [templateStringInYieldKeyword.ts]
function* gen() {
    // Once this is supported, the inner expression does not need to be parenthesized.
    var x = yield `abc${ x }def`;
}


//// [templateStringInYieldKeyword.js]
function* gen() {
    // Once this is supported, the inner expression does not need to be parenthesized.
    var x = yield `abc${x}def`;
}
