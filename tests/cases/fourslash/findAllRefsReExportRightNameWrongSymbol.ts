/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 0;|]

// @Filename: /b.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] = 0;|]

//@Filename: /c.ts
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}x|] } from "./b";|]
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}x|] } from "./a";|]
////[|x|];

// @Filename: /d.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 9 |}x|] } from "./c";|]

verify.noErrors();
const [aDef, a, bDef, b, cFromBDef, cFromB, cFromADef, cFromA, cUse, dDef, d] = test.ranges();
const cFromARanges = [cFromA, cUse];

const aGroup = { definition: "const x: 0", ranges: [a] };
const cFromAGroup = { definition: "(alias) const x: 0\nimport x", ranges: cFromARanges };

verify.referenceGroups(a, [aGroup, cFromAGroup]);

const bGroup = { definition: "const x: 0", ranges: [b] };
const cFromBGroup = { definition: "(alias) const x: 0\nexport x", ranges: [cFromB] };
const dGroup = { definition: "(alias) const x: 0\nimport x", ranges: [d] };
verify.referenceGroups(b, [bGroup, cFromBGroup, dGroup]);

verify.referenceGroups(cFromB, [cFromBGroup, dGroup, bGroup]);
verify.referenceGroups(cFromARanges, [cFromAGroup, aGroup]);

verify.referenceGroups(d, [dGroup, cFromBGroup, bGroup]);

verify.renameLocations(a, [a, cFromA, cUse]);
verify.renameLocations([cFromA, cUse], [{ range: cFromA, prefixText: "x as " }, cUse]);
verify.renameLocations(b, [b, { range: cFromB, suffixText: " as x" }]);
verify.renameLocations(cFromB, [{ range: cFromB, prefixText: "x as " }, d]);
verify.renameLocations(d, [{ range: d, prefixText: "x as " }]);
