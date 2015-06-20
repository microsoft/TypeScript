// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
async function foo(): Promise<void> {
  var v = { [await]: foo }
}