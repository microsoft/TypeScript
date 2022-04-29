/// <reference path='fourslash.ts'/>

////interface I {
////    ["/*0*/prop1"]: () => void;
////}
////
////class C implements I {
////    ["/*1*/prop1"]: any;
////}
////
////var x: I = {
////    ["/*2*/prop1"]: function () { },
////}

verify.baselineFindAllReferences('0', '1', '2')
