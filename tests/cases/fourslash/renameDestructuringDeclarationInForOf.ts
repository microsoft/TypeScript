/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////var elems: I[];
////
////for ([|let { [|{| "contextRangeIndex": 2 |}property1|] } of elems|]) {
////    [|property1|]++;
////}
////for ([|let { [|{| "contextRangeIndex": 5 |}property1|]: p2 } of elems|]) {
////}

const [r0Def, r0, r1Def, r1, r2, r3Def, r3] = test.ranges();
verify.renameLocations([r0, r3], [r0, { range: r1, suffixText: ": property1" }, r3]);
verify.renameLocations([r1, r2], [{ range: r1, prefixText: "property1: " }, r2]);
