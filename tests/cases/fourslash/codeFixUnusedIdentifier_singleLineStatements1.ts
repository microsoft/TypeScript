/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////export const a = 1; const b = 1;

verify.codeFix({
    description: "Remove unused declaration for: 'b'",
    newFileContent: "export const a = 1; "
});
