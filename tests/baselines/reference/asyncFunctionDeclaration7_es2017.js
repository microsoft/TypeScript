//// [tests/cases/conformance/async/es2017/functionDeclarations/asyncFunctionDeclaration7_es2017.ts] ////

//// [asyncFunctionDeclaration7_es2017.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es2017.js]
async function bar() {
    // 'await' here is an identifier, and not a yield expression.
    async function foo(a = await ) {
    }
}
