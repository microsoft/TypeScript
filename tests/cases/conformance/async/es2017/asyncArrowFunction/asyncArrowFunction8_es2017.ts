// @target: es2017
// @noEmitHelpers: true

var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}