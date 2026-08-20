// @allowJs: true
// @checkJs: true,false
// @noEmit: true
// @filename: test.js

// Unlike object literal members, class members are real class-like members, so
// JSDoc modifiers are still semantically validated under checkJs: @override
// without a base class errors. With checkJs off, nothing is validated.

class NoBase {
  /** @override */
  foo() {
  }
}

class Base {
  foo() {
  }
}

class Derived extends Base {
  /** @override */
  foo() {
  }
}
