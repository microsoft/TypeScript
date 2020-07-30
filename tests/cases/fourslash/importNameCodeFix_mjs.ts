/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: foo.js
////module.exports = function foo() {}

// @Filename: utils.cjs
////function util1() {}
////function util2() {}
////module.exports = { util1, util2 };

// @Filename: blah.mjs
////export default class Blah {}

// @Filename: index.mjs
////foo();
////util1();
////util2();
////new Blah;

goTo.file("index.mjs");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent:
`import Blah from "./blah.mjs";
import foo from "./foo.js";
import { util1, util2 } from "./utils.cjs";

foo();
util1();
util2();
new Blah;`
});
