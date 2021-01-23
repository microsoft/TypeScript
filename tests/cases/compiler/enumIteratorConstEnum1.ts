// @target: ES6
const enum ConstTest {
  Foo,
  Bar,
  Baz,
}

// Should be an error.
for (const member of ConstTest) {
}
