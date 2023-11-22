/// <reference path='fourslash.ts' />

// @Filename: foo.ts
////[|export function /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}bar|]() { return "bar"; }|]
////import('./foo').then(([|{ /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}bar|] }|]) => undefined);

const [r0Def, r0, r1Def, r1]  = test.ranges();
verify.baselineFindAllReferences('0', '1');
verify.baselineRename([r0, r1]);