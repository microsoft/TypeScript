/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const [|{| "isWriteAccess": true, "isDefinition": true |}a|] = 0;
////export default [|a|];

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}a|] from "./a";
////[|a|];

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "const a: 0", ranges: [r0, r1] },
    { definition: "import a", ranges: [r2, r3] }
]);
verify.singleReferenceGroup("import a", [r2, r3]);
