/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: foo.js
////module.exports = function foo() {}

// @Filename: utils.js
////function util1() {}
////function util2() {}
////module.exports = { util1, util2 };

// @Filename: blah.js
////export default class Blah {}

// @Filename: index.js
////foo();
////util1();
////util2();
////new Blah;

goTo.file("index.js");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent:
`const foo = require("./foo");
const { util1, util2 } = require("./utils");
const { default: Blah } = require("./blah");

foo();
util1();
util2();
new Blah;`
});
