/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {}|]

// @Filename: b.ts
////[|export { [|{| "contextRangeIndex": 2 |}f|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}g|] } from "./a";|]
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}f|] } from "./a";|]
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}g|] } from "./b";|]

verify.noErrors();

const [f0Def, f0, f1Def, f1, g0, f2Def, f2, g1Def, g1] = test.ranges();

const af = { definition: "function f(): void", ranges: [f0, f1] };
const g0Group = { definition: "(alias) function g(): void\nexport g", ranges: [g0] };
const g1Group = { definition: "(alias) function g(): void\nimport g", ranges: [g1] };
const bf = { definition: "(alias) function f(): void\nimport f", ranges: [f2] };

verify.referenceGroups([f0, f1], [af, g0Group, g1Group, bf]);
verify.referenceGroups(g0, [g0Group, g1Group]);
verify.referenceGroups(g1, [g1Group, g0Group]);
verify.referenceGroups(f2, [bf, af, g0Group, g1Group]);

verify.renameLocations([f0, f1], [f0, f1, f2]);
verify.renameLocations(f2, [{ range: f2, prefixText: "f as " }]);
verify.renameLocations(g0, [g0, g1]);
verify.renameLocations(g1, [{ range: g1, prefixText: "g as " }]);
