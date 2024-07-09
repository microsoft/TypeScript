// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: index.js
function foo() {}

foo.foo = foo;
foo.default = foo;
module.exports = foo;