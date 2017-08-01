/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;

//@Filename: /b.ts
////import { [|x|] as [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./a";
////[|x|];

verify.noErrors();
const [r0, r1, r2, r3] = test.ranges();
const aRanges = [r0, r1];
const bRanges = [r2, r3];
const aGroup = { definition: "const x: 0", ranges: aRanges };
const bGroup =  { definition: "import x", ranges: bRanges };
verify.referenceGroups(aRanges, [aGroup, bGroup]);
verify.referenceGroups(bRanges, [bGroup]);

verify.rangesAreRenameLocations(aRanges);
verify.rangesAreRenameLocations(aRanges);
