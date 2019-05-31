/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////var C = class  {
////}
////[|C.[|{| "declarationRangeIndex": 0 |}staticProperty|] = "string";|]
////console.log(C.[|staticProperty|]);

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
