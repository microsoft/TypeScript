/// <reference path='fourslash.ts' />

////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 0;|]
////[|x|];

const ranges = test.rangesByText().get("x");
verify.referenceGroups(ranges, [
    {
        definition: { text: "const x: 0", range: ranges[0] },
        ranges,
    },
])
