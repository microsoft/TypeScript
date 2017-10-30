/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export [|{| "isDefinition": true, "isWriteAccess": true |}default|] 1;

// @Filename: /b.ts
////import [|{| "isDefinition": true, "isWriteAccess": true |}a|] from "./a";

const [r0, r1] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(property) default: 1", ranges: [r0] },
    { definition: "import a", ranges: [r1] },
]);
