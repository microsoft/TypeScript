/// <reference path='fourslash.ts'/>

////function foo(a: string) {
////}
////foo(/*1*/undefined);
////var x = {
////    undefined: 10
////};
////x./*2*/undefined = 30;

verify.quickInfos({
    1: "var undefined",
    2: "(property) undefined: number"
});
