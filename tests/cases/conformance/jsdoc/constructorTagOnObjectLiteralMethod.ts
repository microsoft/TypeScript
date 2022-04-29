// @noEmit: true
// @Filename: example.js
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
const obj = {
  /** @constructor */
  Foo() { this.bar = "bar" }
};
(new obj.Foo()).bar
