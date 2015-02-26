//// [asyncFunctionDeclaration7_es6.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es6.js]
function bar() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
            // 'await' here is an identifier, and not a yield expression.
            function foo(a = await) {
                return new Promise(function (_resolve) {
                    _resolve(__awaiter(function* () { }()));
                });
            }
        }()));
    });
}
