/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/module m1 {}/*1*/


verify.refactoringsAtPostion( [{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 */
module m1 {}
`
}]);