/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const [|{| "isWriteAccess": true, "isDefinition": true |}a|] = 0;
////export [|{| "isWriteAccess": true, "isDefinition": true |}default|] [|a|];

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}a|] from "./a";
////[|a|];

const [r0, r1, r2, r3, r4] = test.ranges();
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
