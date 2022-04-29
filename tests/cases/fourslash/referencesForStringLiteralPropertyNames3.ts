/// <reference path='fourslash.ts'/>

////class Foo2 {
////    /*1*/get "/*2*/42"() { return 0; }
////    /*3*/set /*4*/42(n) { }
////}
////
////var y: Foo2;
////y[/*5*/42];

verify.baselineFindAllReferences('1', '2', '3', '4', '5');