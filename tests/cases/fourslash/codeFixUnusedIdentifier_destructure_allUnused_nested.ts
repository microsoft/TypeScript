/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x: { a, b } } = o;

verify.codeFix({
    description: "Remove destructuring",
    newFileContent:
`export {};
const { } = o;`,
});
