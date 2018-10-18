/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, property1: number;
////for (let { [|property1|]: p2 } = elems[0]; p2 < 100; p2++) {
////}
////for (let { [|property1|] } = elems[0]; p2 < 100; p2++) {
////    [|property1|] = p2;
////}

const [r0, r1, r2, r3] = test.ranges();
verify.renameLocations([r0, r1], [r0, r1, { range: r2, suffixText: ": property1" }]);
verify.renameLocations([r2, r3], [{ range: r2, prefixText: "property1: " }, r3]);
