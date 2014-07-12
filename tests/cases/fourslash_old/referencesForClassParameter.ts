/// <reference path='fourslash.ts'/>

// Reference to a class parameter.

////var p = 2;
////
////class p { }
////
////class foo {
////    constructor (public p: any) {
////    }
////
////    public f(p) {
////        this./*1*/p = p;
////    }
////
////}
////
////var n = new foo(undefined);
////n./*2*/p = null;

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);