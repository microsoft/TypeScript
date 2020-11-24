/// <reference path='fourslash.ts' />

// @noLib: true
// @noUnusedLocals: true

////let x = 0;
////x = 1;
////export {};

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    newFileContent:
`export {};`,
});
