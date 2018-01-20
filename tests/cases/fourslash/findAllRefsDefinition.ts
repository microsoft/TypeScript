/// <reference path='fourslash.ts' />

////const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////[|x|];

// TODO: GH#21301

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r1, [
    {
        definition: { text: "const x: 0", range: r1 },
        ranges,
    },
])
