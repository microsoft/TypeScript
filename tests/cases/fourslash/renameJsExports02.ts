/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////module.exports = class /*1*/A {}

// @Filename: b.js
////const /*2*/A = require("./a");

verify.baselineFindAllReferences('1', '2')
