/// <reference path='fourslash.ts' />

// @noLib: true

// @Filename: /a.ts
////var [|{| "isDefinition": true |}x|];
////export { [|x|] as [|{| "isWriteAccess": true, "isDefinition": true |}y|] };


verify.noErrors();

const [ax0, ax2, ay] = test.ranges();
const axRanges = [ax0, ax2];
const axGroup = { definition: "var x: any", ranges: axRanges };
const ayGroup = { definition: "(alias) var y: any\nexport y", ranges: [ay] }
verify.referenceGroups(ax0, [axGroup, ayGroup]);
