// @target: es6
function*bar() {
  // 'yield' here is an identifier, and not a yield expression.
  function*foo(a = yield) {
  }
}