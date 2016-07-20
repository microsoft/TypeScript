/// <reference path='fourslash.ts' />

// @Filename: file1.ts
////    var /*0*/y = {
////        f1<T extends number>(x:number, y:Array<string>):string{return "";},
////        x : 0
////    }/*1*/, x1 = 0;


verify.codeRefactor({
    description: "Extract Interface from Variable",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText:`
interface newInterface_y {
    f1<T extends number>(x:number, y:Array<string>):string;
    x;
}
var y:newInterface_y = {
    f1<T extends number>(x:number, y:Array<string>):string{return "";},
    x : 0
}, x1 = 0;
`
}]});