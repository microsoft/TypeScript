/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/class C1 {
//// }/*1*/

verify.codeRefactor([{
    fileName: "file1.ts",
    expectedText:`
interface newInterface_C1 {
}
class C1 implements newInterface_C1{
}
`
}]);