/// <reference path='fourslash.ts' />

////interface Foo {
////    doStuff(x: string, callback: (a: string) => string);
////}
////var x1: Foo = {
////    y/*1*/1: () => {
////        return "";
////    } ,
////    doStuff: (z, callback) => { return callback(this.y); }
////}
////var value = 3;
////class Foo {
////    static getRandomPosition() {
////        return {
////            "row": v/*2*/alue
////        }
////  }
////}

verify.quickInfos({
    1: "(property) y1: () => string",
    2: "var value: number"
});
