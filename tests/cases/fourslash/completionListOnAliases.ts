/// <reference path='fourslash.ts' />

////module M {
////    export var value;
////
////    import x = M;
////    /*1*/
////    x./*2*/
////}

goTo.marker("1");
verify.completionListContains("x", "import x = M", undefined);

goTo.marker("2");
verify.completionListContains("value");
