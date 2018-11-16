/// <reference path='fourslash.ts' />

////declare namespace [|{| "isWriteAccess": true, "isDefinition": true |}N|] {
////    export var x: number;
////}
////declare module "mod" {
////    export = [|N|];
////}
////declare module "a" {
////    import * as [|{| "isWriteAccess": true, "isDefinition": true |}O|] from "mod";
////    export { [|O|] as [|{| "isWriteAccess": true, "isDefinition": true |}P|] }; // Renaming N here would rename
////}
////declare module "b" {
////    import { [|P|] as [|{| "isWriteAccess": true, "isDefinition": true |}Q|] } from "a";
////    export const y: typeof [|Q|].x;
////}

verify.noErrors();

const [N0, N1, O0, O1, P0, P1, Q0, Q1] = test.ranges();
const nRanges = [N0, N1];
const oRanges = [O0, O1];
const pRanges = [P0, P1];
const qRanges = [Q0, Q1];

const ns = { definition: "namespace N", ranges: nRanges };
const os = { definition: "(alias) namespace O\nimport O", ranges: oRanges };
const ps = { definition: "(alias) namespace P\nexport P", ranges: pRanges };
const qs = { definition: "(alias) namespace Q\nimport Q", ranges: qRanges };

verify.referenceGroups(nRanges, [ns, os, ps, qs]);
verify.referenceGroups(oRanges, [os, ps, qs]);
verify.referenceGroups(pRanges, [ps, qs]);
verify.referenceGroups(qRanges, [qs]);

verify.rangesWithSameTextAreRenameLocations();
