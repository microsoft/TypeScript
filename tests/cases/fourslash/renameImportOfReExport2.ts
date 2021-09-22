/// <reference path='fourslash.ts' />

////declare module "a" {
////    [|export class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {}|]
////}
////declare module "b" {
////    [|export { [|{| "contextRangeIndex": 2 |}C|] as /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}D|] } from "a";|]
////}
////declare module "c" {
////    [|import { /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}D|] } from "b";|]
////    export function f(c: [|D|]): void;
////}

verify.noErrors();

const ranges = test.rangesByText();
const cRanges = ranges.get("C");
const dRanges = ranges.get("D");
const [d0, d1, d2] = dRanges;

verify.rangesAreRenameLocations(cRanges);
verify.renameLocations(cRanges[1], cRanges);
verify.renameLocations(d0, dRanges);
verify.renameLocations([d1, d2], [{ range: d1, prefixText: "D as " }, d2]);
verify.baselineFindAllReferences('1', '2', '3')
