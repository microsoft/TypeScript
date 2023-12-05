/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, [|[|{| "contextRangeIndex": 2 |}property1|]: number|];
////for ([|{ [|{| "contextRangeIndex": 4 |}property1|] } = elems[0]|]; p2 < 100; p2++) {
////   p2 = [|property1|]++;
////}
////for ([|{ [|{| "contextRangeIndex": 7 |}property1|]: p2 } = elems[0]|]; p2 < 100; p2++) {
////}

verify.noErrors();
const ranges = test.ranges();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3, r4Def, r4] = ranges;
verify.baselineRename([r0, r4, r1, r2, r3]);
