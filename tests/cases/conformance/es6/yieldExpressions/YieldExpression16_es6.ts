function* foo() {
  function bar() {
    yield foo;
  }
}