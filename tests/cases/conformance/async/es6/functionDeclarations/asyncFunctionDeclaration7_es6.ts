// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}