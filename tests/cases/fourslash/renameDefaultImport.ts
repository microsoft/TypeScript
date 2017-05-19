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
const imports = { definition: "import B", ranges: [B0, B1] };
verify.referenceGroups(C, [classes, imports]);
verify.referenceGroups(B0, [imports, classes]);
verify.referenceGroups(B1, [
    { definition: "(alias) new B(): B\nimport B", ranges: [B0, B1] },
    classes
]);

verify.renameLocations(C, ranges);
verify.rangesAreRenameLocations([B0, B1]);
