/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
////export function f1() {} function f2() {}

verify.codeFix({
    description: "Remove unused declaration for: 'f2'",
    index: 0,
    newFileContent: "export function f1() {} "
});
