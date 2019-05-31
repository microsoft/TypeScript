/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////function bar() {
////    [|this.[|{| "declarationRangeIndex": 0 |}x|] = 10;|]
////}
////var t = new bar();
////[|t.[|{| "declarationRangeIndex": 2 |}x|] = 11;|]

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.rangesAreRenameLocations([r0, r1]);
