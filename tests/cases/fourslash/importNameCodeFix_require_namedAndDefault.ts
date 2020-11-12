/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: blah.ts
////export default class Blah {}
////export const Named1 = 0;
////export const Named2 = 1;

// @Filename: index.js
////Named1 + Named2;
////new Blah;

goTo.file("index.js");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent:
`const { default: Blah, Named1, Named2 } = require("./blah");

Named1 + Named2;
new Blah;`
});
