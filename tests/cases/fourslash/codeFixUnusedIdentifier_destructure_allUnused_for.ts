/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////for (const { x } of o) {}

verify.codeFix({
    description: ts.Diagnostics.Remove_unused_destructuring_declaration.message,
    newFileContent:
`for (const {} of o) {}`,
});
