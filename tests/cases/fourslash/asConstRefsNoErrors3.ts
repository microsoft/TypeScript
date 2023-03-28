/// <reference path="fourslash.ts" />

// @checkJs: true
// @Filename: file.js
////class Tex {
////    type = (/** @type {/**/const} */'Text');
////}

verify.baselineGoToDefinition("");
verify.noErrors();