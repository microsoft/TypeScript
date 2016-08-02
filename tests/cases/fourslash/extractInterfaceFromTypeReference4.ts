/// <reference path='fourslash.ts' />

// @Filename: file1.ts
////    var /*0*/y = {
////        f1():string{}
////    }/*1*/


verify.codeRefactor({
    description: "Extract Interface from Variable",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText:`
interface newInterface_y {
    f1():string;
}
var y:newInterface_y = {
    f1():string{}
}
`
}]});