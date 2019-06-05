/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class {
////  constructor(y) {
////    this.x = y;
////  }
////}
////[|C.prototype.[|{| "declarationRangeIndex": 0 |}z|] = 1;|]
////var t = new C(12);
////[|t.[|{| "declarationRangeIndex": 2 |}z|] = 11;|]

verify.rangesWithSameTextAreRenameLocations("z");
