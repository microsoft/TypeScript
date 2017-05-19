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
const bRanges = [B0, B1];
const classes = { definition: "class C", ranges: [C] };
const imports = { definition: "import B", ranges: [B0, B1] };
verify.referenceGroups(C, [classes, imports]);
verify.referenceGroups(B0, [imports]);
verify.referenceGroups(B1, [{ definition: "(alias) new B(): B\nimport B", ranges: bRanges }]);

verify.rangesAreRenameLocations([C]);
verify.rangesAreRenameLocations(bRanges);
