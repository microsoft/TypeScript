/// <reference path='fourslash.ts' />
// @noLib: true

////declare module "a" {
////    [|export class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {}|]
////}
////declare module "b" {
////    [|export { /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}C|] } from "a";|]
////}
////declare module "c" {
////    [|import { /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}C|] } from "b";|]
////    export function f(c: [|C|]): void;
////}

verify.noErrors();

const ranges = test.ranges();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = ranges;
const importRanges = [r2, r3];
verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['1', '2', '3'] },
    { type: "findRenameLocations", markerOrRange: r0 },
    { type: "findRenameLocations", markerOrRange: r1 },
    { type: "findRenameLocations", markerOrRange: importRanges },
);
