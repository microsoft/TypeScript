// @strict: false
// @target: es6
function * foo() {
  var v = { [yield]: foo }
}