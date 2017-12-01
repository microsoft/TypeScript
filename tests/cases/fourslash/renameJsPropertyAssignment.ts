/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////}
////bar.[|foo|] = "foo";
////console.log(bar.[|foo|]);

verify.rangesAreRenameLocations();
