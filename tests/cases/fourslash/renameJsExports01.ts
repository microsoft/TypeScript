/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////[|exports.[|{| "contextRangeIndex": 0 |}area|] = function (r) { return r * r; }|]

// @Filename: b.js
////var mod = require('./a');
////var t = mod./*1*/[|area|](10);

verify.baselineFindAllReferences('1');
verify.baselineRenameAtRangesWithText("area");