/// <reference path='fourslash.ts'/>

// Reference to a class parameter.

////var p = 2;
////
////class p { }
////
////class foo {
////    constructor (/*1*/public /*2*/p: any) {
////    }
////
////    public f(p) {
////        this./*3*/p = p;
////    }
////
////}
////
////var n = new foo(undefined);
////n./*4*/p = null;

verify.baselineFindAllReferences('1', '2', '3', '4');
