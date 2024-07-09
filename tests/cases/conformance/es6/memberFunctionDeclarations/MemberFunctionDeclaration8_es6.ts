// @target: es6
class C {
  foo() {
    // Make sure we don't think of *bar as the start of a generator method.
    if (a) ¬ * bar;
    return bar;
  }
}