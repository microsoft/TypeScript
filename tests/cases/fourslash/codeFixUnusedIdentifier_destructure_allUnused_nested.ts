/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x: { a, b } } = o;

verify.codeFix({
    description: ts.Diagnostics.Remove_unused_destructuring_declaration.message,
    newFileContent:
`export {};
const { } = o;`,
});
