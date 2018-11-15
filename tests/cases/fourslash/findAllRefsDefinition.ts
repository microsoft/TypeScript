/// <reference path='fourslash.ts' />

////const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////[|x|];

const ranges = test.ranges();
verify.referenceGroups(ranges, [
    {
        definition: { text: "const x: 0", range: ranges[0] },
        ranges,
    },
])
