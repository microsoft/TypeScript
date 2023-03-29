/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////}
////[|bar.[|{| "contextRangeIndex": 0 |}foo|] = "foo";|]
////console.log(bar.[|foo|]);

verify.baselineRenameAtRangesWithText("foo");
