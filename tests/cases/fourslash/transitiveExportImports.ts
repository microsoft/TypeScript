/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////[|class /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}A|] {
////}|]
////[|export = [|{| "contextRangeIndex": 2 |}A|];|]

// @Filename: b.ts
////[|export import /*2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}b|] = require('./a');|]

// @Filename: c.ts
////[|import /*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}b|] = require('./b');|]
////var a = new /*4*/[|b|]./**/[|b|]();

goTo.marker();
verify.quickInfoExists();
verify.noErrors();

const [a0Def, a0, a1Def, a1, b0Def, b0, c0Def, c0, c1, c2] = test.ranges();
const aRanges = [a0, a1];
const bRanges = [b0, c2];
const cRanges = [c0, c1];

verify.baselineFindAllReferences('1', '2', '3', '4');
verify.baselineRename(aRanges);
verify.baselineRename(bRanges);
verify.baselineRename(cRanges);