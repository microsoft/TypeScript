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
const zReferenceGroup1: FourSlashInterface.ReferenceGroup = {
    definition: "(property) z: string",
    ranges: [z0]
};
const zReferenceGroup2: FourSlashInterface.ReferenceGroup = {
    definition: "const z: string",
    ranges: [z1, z2]
};

verify.baselineFindAllReferences('q0', 'q1', 'q2', 'q3', 'z0', 'z1', 'z2');
verify.baselineRename([q0, q1, q2, q3], { providePrefixAndSuffixTextForRename: true });
verify.baselineRename([q0, q1, q2, q3], { providePrefixAndSuffixTextForRename: false });
verify.baselineRename([z0, z1, z2], { providePrefixAndSuffixTextForRename: true });
verify.baselineRename([z0, z1, z2], { providePrefixAndSuffixTextForRename: false });