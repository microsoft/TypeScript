/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class C {
////  constructor(y) {
////    [|this.[|{| "declarationRangeIndex": 0 |}x|] = y;|]
////  }
////}
////var t = new C(12);
////[|t.[|{| "declarationRangeIndex": 2 |}x|] = 11;|]

verify.rangesWithSameTextAreRenameLocations("x");
