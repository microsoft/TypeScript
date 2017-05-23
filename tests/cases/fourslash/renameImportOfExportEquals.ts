/// <reference path='fourslash.ts' />

////declare namespace [|{| "isWriteAccess": true, "isDefinition": true |}N|] {
////    export var [|{| "isWriteAccess": true, "isDefinition": true |}x|]: number;
////}
////declare module "mod" {
////    export = [|N|];
////}
////declare module "a" {
////    import * as [|{| "isWriteAccess": true, "isDefinition": true |}N|] from "mod";
////    export { [|{| "isWriteAccess": true, "isDefinition": true |}N|] }; // Renaming N here would rename
////}
////declare module "b" {
////    import { [|{| "isWriteAccess": true, "isDefinition": true |}N|] } from "a";
////    export const y: typeof [|N|].[|x|];
////}

const [N0, x0, N1, a0, a1, b0, b1, x1] = test.ranges();
const nRanges = [N0, N1];
const aRanges = [a0, a1];
const bRanges = [b0, b1];
const xRanges = [x0, x1];

const nGroup = { definition: "namespace N", ranges: nRanges };
const aGroup = { definition: "import N", ranges: aRanges };
const bGroup = { definition: "import N", ranges: [b0, b1] };

verify.referenceGroups(nRanges, [nGroup, aGroup, bGroup]);
verify.referenceGroups([a0, a1], [aGroup, nGroup, bGroup]);
verify.referenceGroups(bRanges, [bGroup, aGroup, nGroup]);
verify.singleReferenceGroup("var N.x: number", xRanges);

verify.renameLocations(nRanges, nRanges.concat(aRanges, bRanges));
verify.rangesAreRenameLocations(aRanges.concat(bRanges));
verify.rangesAreRenameLocations(xRanges);
