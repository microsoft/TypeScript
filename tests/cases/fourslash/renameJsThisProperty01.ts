/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////    [|this.[|{| "contextRangeIndex": 0 |}x|] = 10;|]
////}
////var t = new bar();
////[|t.[|{| "contextRangeIndex": 2 |}x|] = 11;|]

verify.baselineRenameAtRangesWithText("x");
