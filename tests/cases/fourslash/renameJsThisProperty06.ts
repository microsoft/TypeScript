/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class {
////  constructor(y) {
////    this.x = y;
////  }
////}
////[|C.prototype.[|{| "contextRangeIndex": 0 |}z|] = 1;|]
////var t = new C(12);
////[|t.[|{| "contextRangeIndex": 2 |}z|] = 11;|]

verify.baselineRenameAtRangesWithText("z");
