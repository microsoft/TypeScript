/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|type [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}T|] = number;|]
////[|namespace [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}T|] {
////    export type U = string;
////}|]
////[|[|{| "declarationRangeIndex": 4 |}export|] = [|{| "declarationRangeIndex": 4 |}T|];|]

// @Filename: /b.ts
////const x: import("[|./[|a|]|]") = 0;
////const y: import("[|./[|a|]|]").U = "";

verify.noErrors();

const [r0Def, r0, r1Def, r1, r2Def, rExport, r2, r3, r3b, r4, r4b] = test.ranges();
verify.referenceGroups(r0, [{ definition: "type T = number\nnamespace T", ranges: [r0, r2, r3] }]);
verify.referenceGroups(r1, [{ definition: "namespace T", ranges: [r1, r2] }]);
const t: FourSlashInterface.ReferenceGroup = { definition: "type T = number\nnamespace T", ranges: [r0, r1, r2, r3] };
verify.referenceGroups(r2, [t]);
verify.referenceGroups([r3, r4], [{ definition: 'module "/a"', ranges: [r4, rExport] }, t]);
verify.referenceGroups(rExport, [{ definition: 'module "/a"', ranges: [r3, r4, rExport] }]);

verify.renameLocations(r0, [r0, r2]);
verify.renameLocations(r1, [r1, r2]);
verify.renameLocations(r2, [r0, r1, r2]);
for (const range of [r3b, r4b]) {
    goTo.rangeStart(range);
    verify.renameInfoSucceeded(/*displayName*/ "/a.ts", /*fullDisplayName*/ "/a.ts", /*kind*/ "module", /*kindModifiers*/ "", /*fileToRename*/ "/a.ts", range);
    verify.renameInfoFailed("You cannot rename this element.", /*allowRenameOfImportPath*/ false);
}
