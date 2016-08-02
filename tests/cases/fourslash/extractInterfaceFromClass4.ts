/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// /*0*/class C1 {
////    private x:number;
////    constructor(){}
//// }/*1*/

verify.codeRefactor({
    description: "Extract Interface from Class",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText:`
interface newInterface_C1 {
}
class C1 implements newInterface_C1{
    private x:number;
    constructor(){}
}
`
}]});