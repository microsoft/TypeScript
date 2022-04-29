/// <reference path='fourslash.ts' />

////[|class [|{| "contextRangeIndex": 0 |}A|] {}|]
////module.exports = { B: [|A|] }

const [r0Def, r0, r1] = test.ranges();
verify.renameLocations(r0, [r0, r1]);
verify.renameLocations(r1, [r0, r1]);
