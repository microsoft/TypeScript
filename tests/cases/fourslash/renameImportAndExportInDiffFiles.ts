/// <reference path='fourslash.ts' />

// @Filename: a.ts
////[|export var /*1*/[|{| "isDefinition": true, "contextRangeIndex": 0 |}a|];|]

// @Filename: b.ts
////[|import { /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|] } from './a';|]
////[|export { /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}a|] };|]

const [r0Def, r0, r1Def, r1, r2Def, r2] = test.ranges();

verify.baselineFindAllReferences('1', '2', '3');
verify.baselineRename([r0, r1, r2]);