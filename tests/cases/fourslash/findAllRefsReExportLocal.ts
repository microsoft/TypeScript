/// <reference path='fourslash.ts' />

// @noLib: true

// @Filename: /a.ts
////[|var [|{| "isDefinition": true, "contextRangeIndex": 0 |}x|];|]
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] };|]
////[|export { [|{| "contextRangeIndex": 4 |}x|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}y|] };|]

// @Filename: /b.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}x|], [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}y|] } from "./a";|]
////[|x|]; [|y|];

verify.noErrors();

const [ax0Def, ax0, ax1Def, ax1, ax2Def, ax2, ay, bx0Def, bx0, by0, bx1, by1] = test.ranges();
const axRanges = [ax0, ax1, ax2];
const bxRanges = [bx0, bx1];
const byRanges = [by0, by1];
const axGroup = { definition: "var x: any", ranges: axRanges };
const bxGroup = { definition: "(alias) var x: any\nimport x", ranges: bxRanges };
const ayGroup = { definition: "(alias) var y: any\nexport y", ranges: [ay] }
const byGroup = { definition: "(alias) var y: any\nimport y", ranges: byRanges }

verify.referenceGroups(axRanges, [axGroup, bxGroup, ayGroup, byGroup]);
verify.referenceGroups(bxRanges, [bxGroup, axGroup, ayGroup, byGroup]);
verify.referenceGroups(ay, [ayGroup, byGroup]);
verify.referenceGroups(byRanges, [byGroup, ayGroup]);

verify.renameLocations([ax0, ax2], [ax0, { range: ax1, suffixText: " as x" }, ax2]);
verify.renameLocations(ax1, [{ range: ax1, prefixText: "x as " }, bx0, bx1]);
verify.renameLocations(bxRanges, [{ range: bx0, prefixText: "x as " }, bx1]);
verify.renameLocations(ay, [ay, ...byRanges]);
verify.renameLocations(byRanges, [{ range: by0, prefixText: "y as " }, by1]);
