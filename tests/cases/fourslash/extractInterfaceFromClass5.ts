/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// namespace n1 {
//// /*0*/class C1 {
////    private x:number;
////    constructor(){}
//// }/*1*/
//// }

verify.codeRefactor([{
    fileName: "file1.ts",
    expectedText:`
namespace n1 {
interface newInterface_C1 {
}
class C1 implements newInterface_C1{
    private x:number;
    constructor(){}
}
}
`
}]);