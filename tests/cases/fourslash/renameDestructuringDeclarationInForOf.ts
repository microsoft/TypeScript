/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////for (let { [|property1|] } of elems) {
////    [|property1|]++;
////}
////for (let { [|property1|]: p2 } of elems) {
////}

const [r0, r1, r2, r3] = test.ranges();
verify.renameLocations([r0, r3], [r0, { range: r1, suffixText: ": property1" }, r3]);
verify.renameLocations([r1, r2], [{ range: r1, prefixText: "property1: " }, r2]);
