/// <reference path='fourslash.ts'/>

////interface I {
////    [/*1*/42](): void;
////}
////
////class C implements I {
////    [/*2*/42]: any;
////}
////
////var x: I = {
////    ["/*3*/42"]: function () { }
////}

verify.baselineFindAllReferences('1', '2', '3')
