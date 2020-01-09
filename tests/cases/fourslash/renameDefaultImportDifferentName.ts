/// <reference path='fourslash.ts' />

// @Filename: B.ts
////[|export default class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {
////    test() {
////    }
////}|]

// @Filename: A.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}B|] from "./B";|]
////let b = new [|B|]();
////b.test();

goTo.marker("1");
verify.occurrencesAtPositionCount(1);

const [CDef, C, B0Def, B0, B1] = test.ranges();
const bRanges = [B0, B1];
const classes = { definition: "class C", ranges: [C] };
const imports = { definition: "(alias) class B\nimport B", ranges: [B0, B1] };
verify.referenceGroups(C, [classes, imports]);
verify.singleReferenceGroup(imports.definition, [B0, B1]);


verify.rangesAreRenameLocations([C]);
verify.rangesAreRenameLocations(bRanges);
