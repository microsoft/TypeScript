/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// namespace n1 {
//// class C1 {
////    private x:number;
////    constructor(){}
////    public f1<T extends number>(){}
////    /*0*/private y = {
////        f1(){}
////    }/*1*/
//// }
//// }


verify.codeRefactor({
    description: "Extract Interface from Property",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText:`
namespace n1 {
interface newInterface_y {
    f1();
}
class C1 {
    private x:number;
    constructor(){}
    public f1<T extends number>(){}
    private y:newInterface_y = {
        f1(){}
    }
}
}
`
}]});