/// <reference path="fourslash.ts" />

// @allowJs: true
// @noEmit: true
// @checkJs: true

// @Filename: /X.js
////module.exports = { x: 1 };

// @Filename: /Y.js
////const { /*1*/x: { y } } = require("./X");

verify.baselineFindAllReferences("1");
