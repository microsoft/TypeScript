/// <reference path='fourslash.ts' />

////module m {
////    import foo = module(_foo);
////    var n: num/*1*/
////}

goTo.marker('1');
verify.not.completionListIsEmpty();