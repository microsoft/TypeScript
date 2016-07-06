/// <reference path='fourslash.ts' />

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


verify.codeRefactor(`
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
`);