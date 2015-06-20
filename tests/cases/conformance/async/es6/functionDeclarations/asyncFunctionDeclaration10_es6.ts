// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
async function foo(a = await => await): Promise<void> {
}