/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x, y } = o;

verify.codeFix({
    description: ts.Diagnostics.Remove_unused_destructuring_declaration.message,
    newFileContent:
`export {};
`,
});
