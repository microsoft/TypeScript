/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////}
////[|bar.prototype.[|{| "declarationRangeIndex": 0 |}x|] = 10;|]
////var t = new bar();
////[|t.[|{| "declarationRangeIndex": 2 |}x|] = 11;|]

verify.rangesWithSameTextAreRenameLocations("x");
