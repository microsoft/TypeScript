/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class C {
////  constructor(y) {
////    [|this.[|{| "contextRangeIndex": 0 |}x|] = y;|]
////  }
////}
////var t = new C(12);
////[|t.[|{| "contextRangeIndex": 2 |}x|] = 11;|]

verify.baselineRenameAtRangesWithText("x");
