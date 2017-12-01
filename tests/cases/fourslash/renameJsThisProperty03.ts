/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class C {
////  constructor(y) {
////    this.[|x|] = y;
////  }
////}
////var t = new C(12);
////t.[|x|] = 11;

verify.rangesAreRenameLocations();
