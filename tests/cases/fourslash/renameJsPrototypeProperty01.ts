/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////}
////[|bar.prototype.[|{| "contextRangeIndex": 0 |}x|] = 10;|]
////var t = new bar();
////[|t.[|{| "contextRangeIndex": 2 |}x|] = 11;|]

verify.baselineRenameAtRangesWithText("x");
