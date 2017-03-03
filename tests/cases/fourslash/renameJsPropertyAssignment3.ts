/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class  {
////}
////C.[|staticProperty|] = "string";
////console.log(C./**/[|staticProperty|]);

goTo.marker();
verify.renameLocations( /*findInStrings*/ false, /*findInComments*/ false);