/// <reference path='fourslash.ts' />

////[|declare namespace /*N*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}N|] {
////    [|export var /*x*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|]: number;|]
////}|]
////declare module "mod" {
////    [|export = [|{| "contextRangeIndex": 4 |}N|];|]
////}
////declare module "a" {
////    [|import * as /*a*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}N|] from "mod";|]
////    [|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}N|] };|] // Renaming N here would rename
////}
////declare module "b" {
////    [|import { /*b*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}N|] } from "a";|]
////    export const y: typeof [|N|].[|x|];
////}

const [N0Def, N0, x0Def, x0, N1Def, N1, a0Def, a0, a1Def, a1, b0Def, b0, b1, x1] = test.ranges();
const nRanges = [N0, N1];
const aRanges = [a0, a1];
const bRanges = [b0, b1];
const xRanges = [x0, x1];

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['N', 'a', 'b', 'x'] },
    { type: "findRenameLocations", markerOrRange: nRanges },
    { type: "findRenameLocations", markerOrRange: a0 },
    { type: "findRenameLocations", markerOrRange: a1 },
    { type: "findRenameLocations", markerOrRange: bRanges },
    { type: "findRenameLocations", markerOrRange: xRanges },
);
