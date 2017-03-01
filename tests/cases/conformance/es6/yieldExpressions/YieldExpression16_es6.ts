// @target: es6
function* foo() {
  function bar() {
    yield foo;
  }
}