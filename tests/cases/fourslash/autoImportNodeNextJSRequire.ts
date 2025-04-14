/// <reference path='fourslash.ts' />

// @module: node18
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /matrix.js
//// exports.variants = [];

// @Filename: /main.js
//// exports.dedupeLines = data => {
////   variants/**/
//// }

// @Filename: /totally-irrelevant-no-way-this-changes-things-right.js
//// export default 0;

goTo.file("/main.js");
verify.importFixAtPosition([
`const { variants } = require("./matrix")

exports.dedupeLines = data => {
  variants
}`]);
