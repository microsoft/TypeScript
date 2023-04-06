/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}default|] function() {}|]

// @Filename: /b.ts
////[|import /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}f|] from "./a";|]

const [r0Def, r0, r1Def, r1] = test.ranges();

// Verify that it doesn't try to rename "default"
goTo.rangeStart(r0);
verify.renameInfoFailed();
verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['0', '1'] },
    { type: "findRenameLocations", markerOrRange: r1 }
);
