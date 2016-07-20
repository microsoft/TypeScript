/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/namespace n1 {}/*1*/


verify.codeRefactor({
    description: "Add JSDoc Comments to Module",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 */
namespace n1 {}
`
}]});