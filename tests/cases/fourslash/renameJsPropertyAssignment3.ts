/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class  {
////}
////[|C.[|{| "contextRangeIndex": 0 |}staticProperty|] = "string";|]
////console.log(C.[|staticProperty|]);

verify.baselineRenameAtRangesWithText("staticProperty");
