/// <reference path='fourslash.ts' />

// @Filename: /file1.ts
////declare function log(s: string | number): void;
////const [|{| "isWriteAccess": true, "isDefinition": true |}q|] = 1;
////export { [|{| "isWriteAccess": true, "isDefinition": true |}q|] };
////const x = {
////    [|{| "isWriteAccess": true, "isDefinition": true |}z|]: 'value'
////}
////const { [|{| "isWriteAccess": true, "isDefinition": true |}z|] } = x;
////log([|z|]);

// @Filename: /file2.ts
////declare function log(s: string | number): void;
////import { [|{| "isWriteAccess": true, "isDefinition": true |}q|] } from "./file1";
////log([|q|] + 1);

verify.noErrors();

const [q0, q1, z0, z1, z2, q2, q3] = test.ranges();
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
verify.referenceGroups([q0, q1], [qFile1ReferenceGroup, qFile2ReferenceGroup]);
verify.referenceGroups([q2, q3], [qFile2ReferenceGroup, qFile1ReferenceGroup]);

verify.renameLocations(q0, { ranges: [q0, { range: q1, suffixText: " as q" }], providePrefixAndSuffixTextForRename: true });
verify.renameLocations(q1, { ranges: [{ range: q1, prefixText: "q as " }, q2, q3], providePrefixAndSuffixTextForRename: true });
verify.renameLocations([q2, q3], { ranges: [{ range: q2, prefixText: "q as " }, q3], providePrefixAndSuffixTextForRename: true });

verify.renameLocations([q0, q1, q2, q3], { ranges: [q0, q1, q2, q3], providePrefixAndSuffixTextForRename: false });

const zReferenceGroup1: FourSlashInterface.ReferenceGroup = {
    definition: "(property) z: string",
    ranges: [z0]
};
const zReferenceGroup2: FourSlashInterface.ReferenceGroup = {
    definition: "const z: string",
    ranges: [z1, z2]
};

verify.referenceGroups([z0], [{ ...zReferenceGroup1, ranges: [z0, z1] }]);
verify.referenceGroups([z1], [zReferenceGroup1, zReferenceGroup2]);
verify.referenceGroups([z2], [zReferenceGroup2]);

verify.renameLocations([z0], { ranges: [z0, { range: z1, suffixText: ": z" }], providePrefixAndSuffixTextForRename: true });
verify.renameLocations([z1, z2], { ranges: [{ range: z1, prefixText: "z: " }, z2], providePrefixAndSuffixTextForRename: true });

verify.renameLocations([z0, z1, z2], { ranges: [z0, z1, z2], providePrefixAndSuffixTextForRename: false });