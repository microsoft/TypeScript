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
verify.renameLocations([r0, r2], [r0, r2, { range: r3, suffixText: ": property1" }]);
verify.renameLocations([r1, r3], [r1, { range: r3, prefixText: "property1: " }]);

