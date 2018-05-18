/// <reference path='fourslash.ts' />

// @Filename: foo.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}bar|]() { return "bar"; }
////import('./foo').then(({ [|{| "isWriteAccess": true, "isDefinition": true |}bar|] }) => undefined);

const [r0, r1]  = test.ranges();
verify.referenceGroups(r0, [{ definition: "function bar(): string", ranges: [r0, r1] }]);
verify.referenceGroups(r1, [
    { definition: "function bar(): string", ranges: [r0] },
    { definition: "var bar: () => string", ranges: [r1] },
]);
verify.rangesAreRenameLocations();
