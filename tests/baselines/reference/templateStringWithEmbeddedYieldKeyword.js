//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedYieldKeyword.ts] ////

//// [templateStringWithEmbeddedYieldKeyword.ts]
function* gen {
    // Once this is supported, yield *must* be parenthesized.
    var x = `abc${ yield 10 }def`;
}


//// [templateStringWithEmbeddedYieldKeyword.js]
function* gen() {
    // Once this is supported, yield *must* be parenthesized.
    var x = `abc${yield 10}def`;
}
