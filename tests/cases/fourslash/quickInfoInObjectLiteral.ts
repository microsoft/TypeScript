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

goTo.marker("1");
verify.quickInfoIs("() => string", undefined, "y1", "property");

goTo.marker("2");
verify.quickInfoIs("number");
