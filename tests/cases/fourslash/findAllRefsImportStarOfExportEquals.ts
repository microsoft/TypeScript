/// <reference path="fourslash.ts" />

// @allowSyntheticDefaultimports: true
// @Filename: /node_modules/a/index.d.ts
////[|declare function /*a0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}a|](): void;|]
////[|declare namespace /*a1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|] {
////    export const x: number;
////}|]
////[|export = /*a2*/[|{| "contextRangeIndex": 4 |}a|];|]

// Import with different name and we find local refs
// @Filename: /b.ts
////[|import /*b0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}b|] from "a";|]
/////*b1*/[|b|]();
////[|b|].x;

// Import with same name and we find all refs
// @Filename: /c.ts
////[|import /*c0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}a|] from "a";|]
/////*c1*/[|a|]();
/////*c2*/[|a|].x;

verify.noErrors();
const [a0Def, a0, a1Def, a1, a2Def, a2, b0Def, b0, b1, b2, c0Def, c0, c1, c2] = test.ranges();
const aRanges = [a0, a1, a2];
const bRanges = [b0, b1, b2];
const cRanges = [c0, c1, c2];
verify.baselineFindAllReferences('a0', 'a1', 'a2', 'b0', 'b1', 'c0', 'c1', 'c2');
verify.baselineRename(aRanges);
verify.baselineRename(bRanges);
verify.baselineRename(cRanges);
