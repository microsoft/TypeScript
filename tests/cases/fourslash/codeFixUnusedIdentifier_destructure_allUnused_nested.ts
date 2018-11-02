/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export {};
////const { x: { a, b } } = {{}};

verify.codeFix({
    description: "Remove destructuring",
    newFileContent:
`export {};
const { } = {{}};`,
});
