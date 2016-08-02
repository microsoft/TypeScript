/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/class c1 {}/*1*/


verify.codeRefactor({
    description: "Add JSDoc Comments to Class",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 */
class c1 {}
`
}]});