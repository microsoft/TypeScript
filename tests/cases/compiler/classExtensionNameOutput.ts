class A {}
if (true) {
  class B extends A {}

  const foo = function () {
    new B();
  }
}