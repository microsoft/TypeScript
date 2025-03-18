//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration9_es5.ts] ////

//// [asyncFunctionDeclaration9_es5.ts]
async function foo(): Promise<void> {
  var v = { [await]: foo }
}

//// [asyncFunctionDeclaration9_es5.js]
async function foo() {
    var v = { [await ]: foo };
}
