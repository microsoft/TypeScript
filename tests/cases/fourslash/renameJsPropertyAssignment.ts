/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////}
////[|bar.[|{| "declarationRangeIndex": 0 |}foo|] = "foo";|]
////console.log(bar.[|foo|]);

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
