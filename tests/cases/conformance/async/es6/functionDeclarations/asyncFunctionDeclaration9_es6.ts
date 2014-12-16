// @target: ES6
// @noHelpers: true
async function foo(): Promise<void> {
  var v = { [await]: foo }
}