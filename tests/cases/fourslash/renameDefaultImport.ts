/// <reference path='fourslash.ts' />

// @Filename: B.ts
////export default class /*1*/[|B|] {
////    test() {
////    }
////}

// @Filename: A.ts
////import [|B|] from "./B";
////let b = new [|B|]();
////b.test();

goTo.marker("1");
verify.occurrencesAtPositionCount(1);

const [C, B0, B1] = test.ranges();
verify.rangesReferenceEachOther();

goTo.rangeStart(C);
verify.renameLocations(false, false, [C, B0, B1]);

const rangesInB = [B0, B1];
for (const r of rangesInB) {
    goTo.rangeStart(r);
    verify.renameLocations(false, false, rangesInB);
}
