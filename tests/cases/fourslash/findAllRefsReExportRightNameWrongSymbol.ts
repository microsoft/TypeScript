/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export const /*a*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 0;|]

// @Filename: /b.ts
////[|export const /*b*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] = 0;|]

//@Filename: /c.ts
////[|export { /*cFromB*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}x|] } from "./b";|]
////[|import { /*cFromA*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}x|] } from "./a";|]
/////*cUse*/[|x|];

// @Filename: /d.ts
////[|import { /*d*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 9 |}x|] } from "./c";|]

verify.noErrors();
const [aDef, a, bDef, b, cFromBDef, cFromB, cFromADef, cFromA, cUse, dDef, d] = test.ranges();
verify.baselineFindAllReferences('a', 'b', 'cFromB', 'cFromA', 'cUse', 'd');
verify.baselineRename(a);
verify.baselineRename([cFromA, cUse]);
verify.baselineRename(b);
verify.baselineRename(cFromB);
verify.baselineRename(d);