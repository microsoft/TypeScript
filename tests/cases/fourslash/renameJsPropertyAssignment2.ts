/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class Minimatch {
////}
////Minimatch.[|staticProperty|] = "string";
////console.log(Minimatch./**/[|staticProperty|]);

goTo.marker();
verify.renameLocations( /*findInStrings*/ false, /*findInComments*/ false);