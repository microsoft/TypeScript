/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}a|] = 0;|]
////[|export [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}default|] [|{| "contextRangeIndex": 2 |}a|];|]

// @Filename: /b.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}a|] from "./a";|]
////[|a|];

const [r0Def, r0, r1Def, r1, r2, r3Def, r3, r4] = test.ranges();
verify.referenceGroups([r0, r2], [
    { definition: "const a: 0", ranges: [r0, r2] },
    { definition: "(alias) const a: 0\nimport a", ranges: [r3, r4] }
]);
verify.referenceGroups(r1, [
    { definition: "(alias) const a: 0\nexport default a", ranges: [r1] },
    { definition: "(alias) const a: 0\nimport a", ranges: [r3, r4] },
]);
verify.referenceGroups([r3, r4], [
    { definition: "(alias) const a: 0\nimport a", ranges: [r3, r4] },
    { definition: "(alias) const a: 0\nexport default a", ranges: [r1] },
]);
