/// <reference path="fourslash.ts" />

// @allowSyntheticDefaultimports: true
// @Filename: /node_modules/a/index.d.ts
////declare function [|{| "isWriteAccess": true, "isDefinition": true |}a|](): void;
////declare namespace [|{| "isWriteAccess": true, "isDefinition": true |}a|] {
////    export const x: number;
////}
////export = [|a|];

// Import with different name and we find local refs
// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}b|] from "a";
////[|b|]();
////[|b|].x;

// Import with same name and we find all refs
// @Filename: /c.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}a|] from "a";
////[|a|]();
////[|a|].x;

verify.noErrors();
const ranges = test.ranges();
const [a0, a1, a2, b0, b1, b2, c0, c1, c2] = ranges;
const aRanges = [a0, a1, a2];
const bRanges = [b0, b1, b2];
const cRanges = [c0, c1, c2];

verify.referenceGroups([a0, a1, a2], [
    { definition: "namespace a\nfunction a(): void", ranges: aRanges },
    { definition: "(alias) function b(): void\n(alias) namespace b\nimport b", ranges: bRanges },
    { definition: "(alias) function a(): void\n(alias) namespace a\nimport a", ranges: cRanges }
]);

verify.referenceGroups([b0, b1], [
    { definition: "(alias) function b(): void\n(alias) namespace b\nimport b", ranges: bRanges }
]);

verify.referenceGroups([c0, c1, c2], [
    { definition: "(alias) function a(): void\n(alias) namespace a\nimport a", ranges: cRanges },
    { definition: "namespace a\nfunction a(): void", ranges: aRanges },
    { definition: "(alias) function b(): void\n(alias) namespace b\nimport b", ranges: bRanges }
]);

verify.renameLocations(aRanges, aRanges.concat(cRanges));
verify.rangesAreRenameLocations(bRanges);
verify.rangesAreRenameLocations(cRanges);
