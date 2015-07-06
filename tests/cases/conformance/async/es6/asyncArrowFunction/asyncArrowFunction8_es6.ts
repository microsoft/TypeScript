// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true

var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}