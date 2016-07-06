/// <reference path='fourslash.ts' />

////    var /*0*/y = {
////        f1(){}
////    }/*1*/


verify.codeRefactor(`
interface newInterface_y {
    f1();
}
var y:newInterface_y = {
    f1(){}
}
`);