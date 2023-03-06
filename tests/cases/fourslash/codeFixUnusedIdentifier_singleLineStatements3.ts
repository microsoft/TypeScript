/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////export class c1 {} class c2 {}

verify.codeFix({
    description: "Remove unused declaration for: 'c2'",
    index: 0,
    newFileContent: "export class c1 {} "
});
