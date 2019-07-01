/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x, y } = o;

verify.codeFix({
    description: "Remove destructuring",
    newFileContent:
`export {};
`,
});
