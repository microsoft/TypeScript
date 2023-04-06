/// <reference path="fourslash.ts"/>

////function f([|{[|{| "contextRangeIndex": 0 |}required|], optional = [|required|]}: {[|[|{| "contextRangeIndex": 3 |}required|]: number,|] optional?: number}|]) {
////    console.log("required", [|required|]);
////    console.log("optional", optional);
////}
////
////f({[|[|{| "contextRangeIndex": 6 |}required|]: 10|]});

const [r0Def, r0, r1, r2Def, r2, r3, r4Def, r4] = test.ranges();
verify.baselineRename([r0, r1, r3, r2, r4]);
