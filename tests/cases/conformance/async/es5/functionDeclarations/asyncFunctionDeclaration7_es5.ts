// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}