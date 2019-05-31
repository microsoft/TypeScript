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

const [rDef, r0, r1Def, r1] = test.ranges();
verify.rangesAreRenameLocations([r0, r1]);
