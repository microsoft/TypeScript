/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[], p1: number, property1: number;
////[{ [|property1|]: p1 }] = elems;
////[{ [|property1|] }] = elems;

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.renameLocations([r0, r1], ranges);
