/// <reference path='fourslash.ts' />

// @Filename: foo.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}bar|]() { return "bar"; }|]
////import('./foo').then(([|{ [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}bar|] }|]) => undefined);

const [r0Def, r0, r1Def, r1]  = test.ranges();
verify.referenceGroups(r0, [{ definition: "function bar(): string", ranges: [r0, r1] }]);
verify.referenceGroups(r1, [
    { definition: "function bar(): string", ranges: [r0] },
    { definition: "(parameter) bar: () => string", ranges: [r1] },
]);
verify.renameLocations(r0, [r0, { range: r1, suffixText: ": bar" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "bar: " }])
