/// <reference path="fourslash.ts" />

// @Filename: /node_modules/a/index.d.ts
////declare function [|{| "isWriteAccess": true, "isDefinition": true |}a|](): void;
////declare namespace [|{| "isWriteAccess": true, "isDefinition": true |}a|] {
////    export const x: number;
////}
////export = [|a|];

// Import with different name and we find local refs
// @Filename: /b.ts
////import * as [|{| "isWriteAccess": true, "isDefinition": true |}b|] from "a";
////[|b|]();
////[|b|].x;

// Import with same name and we find all refs
// @Filename: /c.ts
////import * as [|{| "isWriteAccess": true, "isDefinition": true |}a|] from "a";
////[|a|]();
////[|a|].x;

verify.noErrors();
const ranges = test.ranges();
const [a0, a1, a2, b0, b1, b2, c0, c1, c2] = ranges;
const aRanges = [a0, a1, a2];
const bRanges = [b0, b1, b2];
const cRanges = [c0, c1, c2];

verify.referenceGroups(a0, [
    { definition: "function a(): void\nnamespace a", ranges: aRanges },
    { definition: "import b", ranges: bRanges },
    { definition: "import a", ranges: cRanges }
]);
verify.referenceGroups([a1, a2], [
    { definition: "namespace a\nfunction a(): void", ranges: aRanges },
    { definition: "import b", ranges: bRanges },
    { definition: "import a", ranges: cRanges }
]);

verify.referenceGroups([b0, b0], [
    { definition: "import b", ranges: bRanges }
]);
verify.referenceGroups(b1, [
    { definition: "(alias) b(): void\nimport b", ranges: bRanges }
]);

verify.referenceGroups([c0, c2], [
    { definition: "import a", ranges: cRanges },
    { definition: "namespace a\nfunction a(): void", ranges: aRanges },
    { definition: "import b", ranges: bRanges }
]);
verify.referenceGroups(c1, [
    { definition: "(alias) a(): void\nimport a", ranges: cRanges },
    { definition: "namespace a\nfunction a(): void", ranges: aRanges },
    { definition: "import b", ranges: bRanges }
]);

verify.renameLocations(aRanges, aRanges.concat(cRanges));
verify.rangesAreRenameLocations(bRanges);
verify.rangesAreRenameLocations(cRanges);
