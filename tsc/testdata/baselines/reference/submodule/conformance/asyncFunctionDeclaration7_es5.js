//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration7_es5.ts] ////

//// [asyncFunctionDeclaration7_es5.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es5.js]
async function bar() {
    // 'await' here is an identifier, and not a yield expression.
    async function foo(a = await ) {
    }
}
