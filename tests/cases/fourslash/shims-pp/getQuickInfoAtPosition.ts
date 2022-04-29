/// <reference path='fourslash.ts'/>

////class SS<T>{}
////
////var x/*1*/1 = new SS<number>();
////var x/*2*/2 = new SS();
////var x/*3*/3 = new SS;

verify.quickInfos({
    1: "var x1: SS<number>",
    2: "var x2: SS<unknown>",
    3: "var x3: SS<unknown>"
});
