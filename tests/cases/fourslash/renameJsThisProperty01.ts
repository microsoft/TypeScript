/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////    [|this.[|{| "declarationRangeIndex": 0 |}x|] = 10;|]
////}
////var t = new bar();
////[|t.[|{| "declarationRangeIndex": 2 |}x|] = 11;|]

verify.rangesWithSameTextAreRenameLocations("x");
