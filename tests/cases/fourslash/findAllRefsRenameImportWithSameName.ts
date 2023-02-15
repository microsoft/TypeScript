/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export const /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 0;|]

//@Filename: /b.ts
////[|import { /*1*/[|{| "contextRangeIndex": 2 |}x|] as /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] } from "./a";|]
/////*3*/[|x|];

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['0', '1', '2', '3'] },
    { type: "findRenameLocations", markerOrRange: [r0, r1, r2, r3] },
);
