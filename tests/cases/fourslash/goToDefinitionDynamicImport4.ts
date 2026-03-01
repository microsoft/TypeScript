/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function /*Destination*/bar() { return "bar"; }

//// import('./foo').then(({ [|ba/*1*/r|] }) => undefined);

verify.baselineGoToDefinition("1");
