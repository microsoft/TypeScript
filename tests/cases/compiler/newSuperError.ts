// @strict: true
// @target: ES2020

// Repro for #63451 - 'new super()' should be a parse error

class A extends class {} {
  static {
    new super(); // expect error TS2824
  }

  static f() {
    new super(); // expect error TS2824
  }
}

console.log("If you see this, the test failed (compilation should show error)");
