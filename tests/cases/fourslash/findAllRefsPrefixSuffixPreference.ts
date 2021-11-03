/// <reference path='fourslash.ts' />

// @Filename: /file1.ts
////declare function log(s: string | number): void;
////[|const /*q0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}q|] = 1;|]
////[|export { /*q1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}q|] };|]
////const x = {
////    [|/*z0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}z|]: 'value'|]
////}
////[|const { /*z1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}z|] } = x;|]
////log(/*z2*/[|z|]);

// @Filename: /file2.ts
////declare function log(s: string | number): void;
////[|import { /*q2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 9 |}q|] } from "./file1";|]
////log(/*q3*/[|q|] + 1);

verify.noErrors();

const [q0Def, q0, q1Def, q1, z0Def, z0, z1Def, z1, z2, q2Def, q2, q3] = test.ranges();
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

verify.renameLocations([z0], { ranges: [z0, { range: z1, suffixText: ": z" }], providePrefixAndSuffixTextForRename: true });
verify.renameLocations([z1, z2], { ranges: [{ range: z1, prefixText: "z: " }, z2], providePrefixAndSuffixTextForRename: true });

verify.renameLocations([z0, z1, z2], { ranges: [z0, z1, z2], providePrefixAndSuffixTextForRename: false });
verify.baselineFindAllReferences('q0', 'q1', 'q2', 'q3', 'z0', 'z1', 'z2')
