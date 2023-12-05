//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration7_es6.ts] ////

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
        function foo() {
            return __awaiter(this, arguments, void 0, function* (a = yield ) {
            });
        }
    });
}
