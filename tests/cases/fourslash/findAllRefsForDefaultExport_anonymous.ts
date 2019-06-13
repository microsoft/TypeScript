/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export [|{| "isDefinition": true, "isWriteAccess": true, "contextRangeIndex": 0 |}default|] 1;|]

// @Filename: /b.ts
////[|import [|{| "isDefinition": true, "isWriteAccess": true, "contextRangeIndex": 2 |}a|] from "./a";|]

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(property) default: 1", ranges: [r0] },
    { definition: "import a", ranges: [r1] },
]);
