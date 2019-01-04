/// <reference path='fourslash.ts' />

// @Filename: /file1.ts
////declare function log(s: string | number): void;
////const [|{| "isWriteAccess": true, "isDefinition": true |}q|] = 1;
////export { [|{| "isWriteAccess": true, "isDefinition": true |}q|] };
////export function foo() {
////    return 3;
////}
////const x = {
////    z: 'value'
////}
////const { z } = x;
////log(z);

// @Filename: /file2.ts
////declare function log(s: string | number): void;
////import {
////    [|{| "isWriteAccess": true, "isDefinition": true |}q|],
////    foo
////} from "./file1";
////log([|q|] + 1);
////log(foo());

verify.noErrors();

const [q0, q1, q2, q3] = test.ranges();
const qFile1Ranges = [q0, q1];
const qFile2Ranges = [q2, q3];
const qFile1ReferenceGroup: FourSlashInterface.ReferenceGroup = {
    definition: "const q: 1",
    ranges: qFile1Ranges
};
const qFile2ReferenceGroup: FourSlashInterface.ReferenceGroup = {
    definition: "(alias) const q: 1\nimport q",
    ranges: qFile2Ranges
};
// verify.referenceGroups([q0, q1], [qFile1ReferenceGroup, qFile2ReferenceGroup]);
// verify.referenceGroups([q2, q3], [qFile2ReferenceGroup, qFile1ReferenceGroup]);

// verify.renameLocations(q0, { ranges: [q0, { range: q1, suffixText: " as q" }], usePrefixAndSuffixForRenamingShorthandExports: true });
// verify.renameLocations(q1, { ranges: [{ range: q1, prefixText: "q as " }, q2, q3], usePrefixAndSuffixForRenamingShorthandExports: true });
// verify.renameLocations([q2, q3], { ranges: [{ range: q2, prefixText: "q as " }, q3], usePrefixAndSuffixForRenamingShorthandExports: true });

// verify.renameLocations(q0, { ranges: [q0, q1, q2, q3], usePrefixAndSuffixForRenamingShorthandExports: false });
verify.renameLocations(q1, { ranges: [q0, q1, q2, q3], usePrefixAndSuffixForRenamingShorthandExports: false });