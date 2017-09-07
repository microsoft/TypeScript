// @Filename: foo.js
// @noEmit: true
// @allowJs: true
// Test #16139
function Foo() {
    arguments;
    return new Foo();
}
