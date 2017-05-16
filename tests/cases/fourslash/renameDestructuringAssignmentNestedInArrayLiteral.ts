/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[], p1: number, [|property1|]: number;
////[{ [|property1|]: p1 }] = elems;
////[{ [|property1|] }] = elems;

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
const propertyRanges = [r0, r2, r3];
const valueRanges = [r1, r3];
verify.renameLocations([r0, r2], propertyRanges);
verify.renameLocations(r1, valueRanges);
verify.renameLocations(r3, ranges);