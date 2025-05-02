/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class Minimatch {
////}
////[|Minimatch.[|{| "contextRangeIndex": 0 |}staticProperty|] = "string";|]
////console.log(Minimatch.[|staticProperty|]);

verify.baselineRenameAtRangesWithText("staticProperty");
