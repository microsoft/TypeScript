/// <reference path='fourslash.ts' />

// @Filename: B.ts
////export default class /*1*/[|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    test() {
////    }
////}

// @Filename: A.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}B|] from "./B";
////let b = new [|B|]();
////b.test();

goTo.marker("1");
verify.occurrencesAtPositionCount(1);

const ranges = test.ranges();
const [C, B0, B1] = ranges;
verify.referenceGroups([C, B0], [{ definition: "class C", ranges }]);
verify.referenceGroups(B1, [{ definition: "constructor C(): B", ranges }]);

goTo.rangeStart(C);
verify.renameLocations(false, false, [C, B0, B1]);

const rangesInB = [B0, B1];
for (const r of rangesInB) {
    goTo.rangeStart(r);
    verify.renameLocations(false, false, rangesInB);
}
