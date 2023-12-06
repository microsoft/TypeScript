/// <reference path='fourslash.ts' />

////[|import [|{| "contextRangeIndex": 0 |}a|] from "module";|]
////[|export { [|{| "contextRangeIndex": 2 |}a|] };|]

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.baselineRename([r0, r1]);
