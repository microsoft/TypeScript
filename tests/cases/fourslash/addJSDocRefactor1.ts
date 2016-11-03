/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/class c1 {}/*1*/


verify.refactoringsAtPostion([{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 */
class c1 {}
`
}]);