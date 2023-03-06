/// <reference path='fourslash.ts' />

// @noLib: true

// @Filename: /a.ts
////[|var /*ax0*/[|{| "isDefinition": true, "contextRangeIndex": 0 |}x|];|]
////[|export { /*ax1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] };|]
////[|export { /*ax2*/[|{| "contextRangeIndex": 4 |}x|] as /*ay*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}y|] };|]

// @Filename: /b.ts
////[|import { /*bx0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}x|], /*by0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}y|] } from "./a";|]
/////*bx1*/[|x|]; /*by1*/[|y|];

verify.noErrors();

const [ax0Def, ax0, ax1Def, ax1, ax2Def, ax2, ay, bx0Def, bx0, by0, bx1, by1] = test.ranges();
const bxRanges = [bx0, bx1];
const byRanges = [by0, by1];

verify.baselineFindAllReferences('ax0', 'ax1', 'ax2', 'bx0', 'bx1', 'ay', 'by0', 'by1')

verify.renameLocations([ax0, ax2], [ax0, { range: ax1, suffixText: " as x" }, ax2]);
verify.renameLocations(ax1, [{ range: ax1, prefixText: "x as " }, bx0, bx1]);
verify.renameLocations(bxRanges, [{ range: bx0, prefixText: "x as " }, bx1]);
verify.renameLocations(ay, [ay, ...byRanges]);
verify.renameLocations(byRanges, [{ range: by0, prefixText: "y as " }, by1]);
