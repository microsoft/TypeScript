/// <reference path='fourslash.ts' />

////    var /*0*/y = {
////        f1<T extends number>(x:number, y:Array<string>):string{return "";},
////        x : 0
////    }/*1*/, x1 = 0;


verify.codeRefactor(`
interface newInterface_y {
    f1<T extends number>(x:number, y:Array<string>):string;
    x;
}
var y:newInterface_y = {
    f1<T extends number>(x:number, y:Array<string>):string{return "";},
    x : 0
}, x1 = 0;
`);