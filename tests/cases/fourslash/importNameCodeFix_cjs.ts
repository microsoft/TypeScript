/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: foo.cjs
////module.exports = function foo() {}

// @Filename: utils.cjs
////function util1() {}
////function util2() {}
////module.exports = { util1, util2 };

// @Filename: blah.js
////export default class Blah {}

// @Filename: index.cjs
////foo();
////util1();
////util2();
////new Blah;

goTo.file("index.cjs");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent:
`const { default: Blah } = require("./blah");
const foo = require("./foo.cjs");
const { util1, util2 } = require("./utils.cjs");

foo();
util1();
util2();
new Blah;`
});
