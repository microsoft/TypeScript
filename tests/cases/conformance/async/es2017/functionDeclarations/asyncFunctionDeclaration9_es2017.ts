// @target: es2017
// @noEmitHelpers: true
async function foo(): Promise<void> {
  var v = { [await]: foo }
}