/// <reference path='fourslash.ts' />

////[|import [|{| "contextRangeIndex": 0 |}a|] from "module";|]
////[|export { [|{| "contextRangeIndex": 2 |}a|] };|]

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.renameLocations(r0, [r0, { range: r1, suffixText: " as a" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "a as " }]);
