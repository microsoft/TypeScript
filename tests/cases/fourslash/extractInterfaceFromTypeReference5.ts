/// <reference path='fourslash.ts' />

////    var /*0*/y = {
////        f1<T extends number>(x:number, y:Array<string>):string{}
////    }/*1*/


verify.codeRefactor(`
interface newInterface_y {
    f1<T extends number>(x:number, y:Array<string>):string;
}
var y:newInterface_y = {
    f1<T extends number>(x:number, y:Array<string>):string{}
}
`);