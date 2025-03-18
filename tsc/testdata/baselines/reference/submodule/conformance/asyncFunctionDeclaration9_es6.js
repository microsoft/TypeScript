//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration9_es6.ts] ////

//// [asyncFunctionDeclaration9_es6.ts]
async function foo(): Promise<void> {
  var v = { [await]: foo }
}

//// [asyncFunctionDeclaration9_es6.js]
async function foo() {
    var v = { [await ]: foo };
}
