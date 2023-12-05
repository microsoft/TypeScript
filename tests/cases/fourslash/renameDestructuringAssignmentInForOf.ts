/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////var elems: I[];
////
////var [|[|{| "contextRangeIndex": 2 |}property1|]: number|], p2: number;
////for ([|{ [|{| "contextRangeIndex": 4 |}property1|] } of elems|]) {
////    [|property1|]++;
////}
////for ([|{ [|{| "contextRangeIndex": 7 |}property1|]: p2 } of elems|]) {
////}

verify.noErrors();
const ranges = test.ranges();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3, r4Def, r4] = ranges;
verify.baselineRename([r0, r4, r1, r2, r3]);
