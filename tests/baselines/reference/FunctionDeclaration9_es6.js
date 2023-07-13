//// [tests/cases/conformance/es6/functionDeclarations/FunctionDeclaration9_es6.ts] ////

//// [FunctionDeclaration9_es6.ts]
function * foo() {
  var v = { [yield]: foo }
}

//// [FunctionDeclaration9_es6.js]
function* foo() {
    var v = { [yield]: foo };
}
