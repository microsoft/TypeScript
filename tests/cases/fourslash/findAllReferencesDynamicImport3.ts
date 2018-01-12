/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function [|bar|]() { return "bar"; }

//// import('./foo').then(({ [|bar|] }) => undefined);

const [r0, r1]  = test.ranges();
// This is because bindingElement at r1 are both name and value
verify.referencesOf(r0, [r1, r0, r1, r0]);
verify.referencesOf(r1, [r0, r1, r1, r0]);
verify.renameLocations(r0, [r0, r1]);
verify.renameLocations(r1, [r1, r0, r0, r1]);