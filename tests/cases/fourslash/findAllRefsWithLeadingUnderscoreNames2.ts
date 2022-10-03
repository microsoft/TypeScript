/// <reference path='fourslash.ts'/>

////class Foo {
////    /*1*/public /*2*/__bar() { return 0; }
////}
////
////var x: Foo;
////x./*3*/__bar;

verify.baselineFindAllReferences('1', '2', '3');
