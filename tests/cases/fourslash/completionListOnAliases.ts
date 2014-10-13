/// <reference path='fourslash.ts' />

////module M {
////    export var value;
////
////    import x = M;
////    /*1*/
////    x./*2*/
////}

goTo.marker("1");
verify.memberListContains("x", "(alias) x", undefined);

goTo.marker("2");
verify.memberListContains("value");
