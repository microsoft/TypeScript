//// [asyncFunctionDeclaration9_es6.ts]
async function foo(): Promise<void> {
  var v = { [await]: foo }
}

//// [asyncFunctionDeclaration9_es6.js]
function foo() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
            var v = { [(yield )]: foo };
        }()));
    });
}
