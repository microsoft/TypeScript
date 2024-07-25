/// <reference path='fourslash.ts'/>

////class Foo {
////    /*1*/"/*2*/blah"() { return 0; }
////}
////
////var x: Foo;
////x./*3*/blah;

verify.baselineFindAllReferences('1', '2', '3');
