/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|type /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}T|] = number;|]
////[|namespace /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}T|] {
////    export type U = string;
////}|]
////[|/*export*/[|{| "contextRangeIndex": 4 |}export|] = /*2*/[|{| "contextRangeIndex": 4 |}T|];|]

// @Filename: /b.ts
////[|const x: import("/*3*/[|{| "contextRangeIndex": 7 |}./[|a|]|]") = 0;|]
////[|const y: import("/*4*/[|{| "contextRangeIndex": 10 |}./[|a|]|]").U = "";|]

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2Def, rExport, r2, r3Def, r3, r3b, r4Def, r4, r4b] = test.ranges();
verify.baselineFindAllReferences('0', '1', '2', '3', '4', 'export');
verify.baselineRename([r0, r1, r2]);
for (const range of [r3b, r4b]) {
    goTo.rangeStart(range);
    verify.renameInfoSucceeded(/*displayName*/ "/a.ts", /*fullDisplayName*/ "./a", /*kind*/ "module", /*kindModifiers*/ "", /*fileToRename*/ "/a.ts", range);
    verify.renameInfoFailed("You cannot rename this element.", { allowRenameOfImportPath: false });
}
