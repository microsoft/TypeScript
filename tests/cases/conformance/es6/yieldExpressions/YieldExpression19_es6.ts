// @target: es6
function*foo() {
  function bar() {
    function* quux() {
      yield(foo);
    }
  }
}