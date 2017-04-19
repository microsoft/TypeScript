/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////namespace [|{| "isWriteAccess": true, "isDefinition": true |}A|] {
////    export const x = 0;
////}

// @Filename: b.ts
////export import [|{| "isWriteAccess": true, "isDefinition": true |}B|] = [|A|];
////[|B|].x;

// @Filename: c.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}B|] } from "./b";

verify.noErrors();

const [A0, B0, A1, B1, B2] = test.ranges();
const aRanges = [A0, A1];
const bRanges = [B0, B1];
const cRanges = [B2];

const aGroup = { definition: "namespace A", ranges: aRanges };
const bGroup = { definition: "import B = A", ranges: bRanges };
const cGroup = { definition: "import B", ranges: cRanges };

verify.referenceGroups(aRanges, [aGroup, bGroup, cGroup]);
verify.referenceGroups(bRanges, [bGroup, cGroup]);
verify.referenceGroups(cRanges, [cGroup, bGroup]);

verify.rangesWithSameTextAreRenameLocations();
