/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////var [|property1|]: number, p2: number;
////for ({ [|property1|] } of elems) {
////    [|property1|]++;
////}
////for ({ [|property1|]: p2 } of elems) {
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.renameLocations([r0, r4], [r0, r2, r4]);
verify.renameLocations([r1, r3], [r1, r2, r3]);
verify.renameLocations(r2, ranges);
