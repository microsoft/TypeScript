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
verify.renameLocations(r0, [r0, { range: r1, suffixText: " as C" }]); //, r1
verify.renameLocations(r1, [{ range: r1, prefixText: "C as " }, r2, r3]);
verify.renameLocations(importRanges, [{ range: r2, prefixText: "C as " }, r3]);

verify.baselineFindAllReferences('1', '2', '3')
