//// [asyncFunctionDeclaration7_es6.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es6.js]
function bar() {
    return __awaiter(this, void 0, void 0, function* () {
        // 'await' here is an identifier, and not a yield expression.
        function foo(a = yield ) {
            return __awaiter(this, void 0, void 0, function* () {
            });
        }
    });
}
