//// [asyncFunctionDeclaration7_es6.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es6.js]
function bar() {
    return __awaiter(function *() {
        // 'await' here is an identifier, and not a yield expression.
        function foo() {
            return __awaiter(function *(a = yield ) {
            }.apply(this, arguments), Promise);
        }
    }.apply(this, arguments), Promise);
}
