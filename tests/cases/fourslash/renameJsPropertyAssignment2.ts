/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class Minimatch {
////}
////Minimatch.[|staticProperty|] = "string";
////console.log(Minimatch.[|staticProperty|]);

verify.rangesAreRenameLocations();
