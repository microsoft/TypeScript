/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;
////namespace [|{| "isWriteAccess": true, "isDefinition": true |}T|] {
////    export type U = string;
////}
////export = [|T|];

// @Filename: /b.ts
////const x: import("[|./[|a|]|]") = 0;
////const y: import("[|./[|a|]|]").U = "";

verify.noErrors();

const [r0, r1, r2, r3, r3b, r4, r4b] = test.ranges();
verify.referenceGroups(r0, [{ definition: "type T = number\nnamespace T", ranges: [r0, r2, r3] }]);
verify.referenceGroups(r1, [{ definition: "namespace T", ranges: [r1, r2] }]);
verify.referenceGroups(r2, [{ definition: "type T = number\nnamespace T", ranges: [r0, r1, r2, r3] }]);
verify.referenceGroups([r3, r4], [
    { definition: 'module "/a"', ranges: [r4] },
    { definition: "type T = number\nnamespace T", ranges: [r0, r1, r2, r3] },
]);

verify.renameLocations(r0, [r0, r2]);
verify.renameLocations(r1, [r1, r2]);
verify.renameLocations(r2, [r0, r1, r2]);
for (const range of [r3b, r4b]) {
    goTo.rangeStart(range);
    verify.renameInfoSucceeded(/*displayName*/ "/a.ts", /*fullDisplayName*/ "/a.ts", /*kind*/ "module", /*kindModifiers*/ "", /*fileToRename*/ "/a.ts", range);
}
