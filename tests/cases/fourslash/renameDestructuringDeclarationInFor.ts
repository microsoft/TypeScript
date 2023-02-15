/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, property1: number;
////for ([|let { [|{| "contextRangeIndex": 2 |}property1|]: p2 } = elems[0]|]; p2 < 100; p2++) {
////}
////for ([|let { [|{| "contextRangeIndex": 4 |}property1|] } = elems[0]|]; p2 < 100; p2++) {
////    [|property1|] = p2;
////}

const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = test.ranges();
verify.baselineRename([r0, r1, r2, r3]);
