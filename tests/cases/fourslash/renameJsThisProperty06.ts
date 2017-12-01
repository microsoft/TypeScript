/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class {
////  constructor(y) {
////    this.x = y;
////  }
////}
////C.prototype.[|z|] = 1;
////var t = new C(12);
////t.[|z|] = 11;

verify.rangesAreRenameLocations();
