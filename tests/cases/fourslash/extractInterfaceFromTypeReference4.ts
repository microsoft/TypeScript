/// <reference path='fourslash.ts' />

////    var /*0*/y = {
////        f1():string{}
////    }/*1*/


verify.codeRefactor(`
interface newInterface_y {
    f1():string;
}
var y:newInterface_y = {
    f1():string{}
}
`);