/// <reference path='fourslash.ts' />

// @Filename: a.ts
////[|export var /*1*/[|{| "isDefinition": true, "contextRangeIndex": 0 |}a|];|]

// @Filename: b.ts
////[|import { /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|] } from './a';|]
////[|export { /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}a|] };|]

const [r0Def, r0, r1Def, r1, r2Def, r2] = test.ranges();

verify.renameLocations(r0, [r0, r1, { range: r2, suffixText: " as a" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "a as " }, { range: r2, suffixText: " as a" }]);
verify.renameLocations(r2, [{ range: r2, prefixText: "a as " }]);
verify.baselineFindAllReferences('1', '2', '3')
