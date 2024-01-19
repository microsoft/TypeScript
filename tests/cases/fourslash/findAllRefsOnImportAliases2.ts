/// <reference path="fourslash.ts" />

//@Filename: a.ts
////[|export class /*class0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Class|] {}|]

//@Filename: b.ts
////[|import { /*class1*/[|{| "contextRangeIndex": 2 |}Class|] as /*c2_0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}C2|] } from "./a";|]
////var c = new /*c2_1*/[|C2|]();

//@Filename: c.ts
////[|export { /*class2*/[|{| "contextRangeIndex": 6 |}Class|] as /*c3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}C3|] } from "./a";|]

verify.baselineFindAllReferences('class0', 'class1', 'class2', 'c2_0', 'c2_1', 'c3');
verify.baselineRenameAtRangesWithText(["Class", "C2", "C3"]);
