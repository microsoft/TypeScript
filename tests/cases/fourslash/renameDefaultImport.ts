/// <reference path='fourslash.ts' />

// @Filename: B.ts
////export default class /*1*/[|{| "isWriteAccess": true, "isDefinition": true |}B|] {
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

const classes = { definition: "class B", ranges: [C] };
const imports = { definition: "(alias) class B\nimport B", ranges: [B0, B1] };
verify.referenceGroups(C, [classes, imports]);
verify.referenceGroups([B0, B1], [imports, classes]);

verify.renameLocations(C, ranges);
verify.rangesAreRenameLocations([B0, B1]);
