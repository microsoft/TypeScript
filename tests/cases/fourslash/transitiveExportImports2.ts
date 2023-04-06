/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////[|namespace /*A*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}A|] {
////    export const x = 0;
////}|]

// @Filename: b.ts
////[|export import /*B*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}B|] = [|A|];|]
////[|B|].x;

// @Filename: c.ts
////[|import { /*C*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}B|] } from "./b";|]

verify.noErrors();

const [A0Def, A0, B0Def, B0, A1, B1, B2Def, B2] = test.ranges();
const aRanges = [A0, A1];
const bRanges = [B0, B1];
const cRanges = [B2];

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ["A", "B", "C"] },
    { type: "findRenameLocations", markerOrRange: aRanges },
    { type: "findRenameLocations", markerOrRange: [B0, B1] },
    { type: "findRenameLocations", markerOrRange: B2 },
);