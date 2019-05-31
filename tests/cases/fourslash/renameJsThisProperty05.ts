/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class C {
////  constructor(y) {
////    this.x = y;
////  }
////}
////[|C.prototype.[|{| "declarationRangeIndex": 0 |}z|] = 1;|]
////var t = new C(12);
////[|t.[|{| "declarationRangeIndex": 2 |}z|] = 11;|]

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.rangesAreRenameLocations([r0, r1]);
