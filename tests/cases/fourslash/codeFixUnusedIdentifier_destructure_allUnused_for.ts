/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////for (const { x } of o) {}

verify.codeFix({
    description: "Remove destructuring",
    newFileContent:
`for (const {} of o) {}`,
});
