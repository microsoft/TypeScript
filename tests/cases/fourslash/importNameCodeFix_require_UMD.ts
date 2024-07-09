/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: umd.d.ts
////namespace Foo { function f() {} }
////export = Foo;
////export as namespace Foo;

// @Filename: index.js
////Foo;
////module.exports = {};

goTo.file("index.js");
verify.codeFix({
  index: 0,
  description: `Add import from "./umd"`,
  newFileContent:
`const Foo = require("./umd");

Foo;
module.exports = {};`
});
