/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////[|export function /*f*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {}|]

// @Filename: b.ts
////[|export { [|{| "contextRangeIndex": 2 |}f|] as /*g0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}g|] } from "./a";|]
////[|import { /*f2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}f|] } from "./a";|]
////[|import { /*g1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 7 |}g|] } from "./b";|]

verify.noErrors();

const [f0Def, f0, f1Def, f1, g0, f2Def, f2, g1Def, g1] = test.ranges();
verify.baselineFindAllReferences('f', 'g0', 'g1', 'f2');
verify.baselineRename([f0, f1]);
verify.baselineRename(f2);
verify.baselineRename(g0);
verify.baselineRename(g1);
