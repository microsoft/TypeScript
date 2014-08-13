/// <reference path='fourslash.ts'/>

// Reference a class static.

// @Filename: referencesOnStatic_1.ts
////var n = 43;
////
////class foo {
////    static n = '';
////
////    public bar() {
////        foo./*1*/n = "'";
////        if(foo.n) {
////            var x = foo.n;
////        }
////    }
////}
////
////class foo2 {
////    private x = foo.n/*2*/;
////    constructor() {
////        foo./*3*/n = x;
////    }
////
////    function b(n) {
////        n = foo.n;
////    }
////}

// @Filename: referencesOnStatic_2.ts
////var q = foo.n;

goTo.marker("1");
verify.referencesCountIs(8);

goTo.marker("2");
verify.referencesCountIs(8);

goTo.marker("3");
verify.referencesCountIs(8);