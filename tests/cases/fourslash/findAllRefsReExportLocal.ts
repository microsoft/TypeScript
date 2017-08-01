/// <reference path='fourslash.ts' />

// @noLib: true

// @Filename: /a.ts
////var [|{| "isWriteAccess": true, "isDefinition": true |}x|];
////export { [|{| "isWriteAccess": true, "isDefinition": true |}x|] };
////export { [|x|] as [|{| "isWriteAccess": true, "isDefinition": true |}y|] };

// @Filename: /b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}x|], [|{| "isWriteAccess": true, "isDefinition": true |}y|] } from "./a";
////[|x|]; [|y|];

verify.noErrors();

const [ax0, ax1, ax2, ay, bx0, by0, bx1, by1] = test.ranges();
const axRanges = [ax0, ax1, ax2];
const bxRanges = [bx0, bx1];
const byRanges = [by0, by1];
const axGroup = { definition: "var x: any", ranges: axRanges };
const bxGroup = { definition: "import x", ranges: bxRanges };
const ayGroup = { definition: "import y", ranges: [ay] }
const byGroup = { definition: "import y", ranges: byRanges }

verify.referenceGroups(axRanges, [axGroup, bxGroup, ayGroup, byGroup]);
verify.referenceGroups(bxRanges, [bxGroup, axGroup, ayGroup, byGroup]);
verify.referenceGroups(ay, [ayGroup, byGroup]);
verify.referenceGroups(byRanges, [byGroup, ayGroup]);

verify.rangesWithSameTextAreRenameLocations();
