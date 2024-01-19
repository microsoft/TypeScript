/// <reference path='fourslash.ts' />

////let x = 10;/*a*//*b*/
////
////function func() {
////    return 10;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Infer function return type");
