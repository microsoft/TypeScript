/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/namespace n1 {}/*1*/


verify.refactoringsAtPostion( [{
    fileName: "file1.ts",
    expectedText: `
/**
 *
 */
namespace n1 {}
`
}]);