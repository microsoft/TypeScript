/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export [|{| "isWriteAccess": true, "isDefinition": true |}default|] function() {}

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}f|] from "./a";

const [r0, r1] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "function default(): void", ranges: [r0] },
    { definition: "import f", ranges: [r1] },
]);
verify.referenceGroups(r1, [
    { definition: "import f", ranges: [r1] },
    { definition: "function default(): void", ranges: [r0] },
]);

// Verify that it doesn't try to rename "default"
goTo.rangeStart(r0);
verify.renameInfoFailed();
verify.renameLocations(r1, [r1]);
