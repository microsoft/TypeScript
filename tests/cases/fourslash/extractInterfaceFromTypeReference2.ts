/// <reference path='fourslash.ts' />

//// namespace n1 {
////    var /*0*/y = {
////        f1(){}
////    }/*1*/
//// }


verify.codeRefactor(`
namespace n1 {
interface newInterface_y {
    f1();
}
var y:newInterface_y = {
    f1(){}
}
}
`);