/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////for (const { x } of [{}]) {}

verify.codeFix({
    description: "Remove destructuring",
    newFileContent:
`for (const {} of [{}]) {}`,
});
