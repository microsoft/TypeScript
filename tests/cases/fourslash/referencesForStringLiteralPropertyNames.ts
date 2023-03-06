/// <reference path='fourslash.ts'/>

////class Foo {
////    public "/*1*/ss": any;
////}
////
////var x: Foo;
////x.ss;
////x["ss"];
////x = { "ss": 0 };
////x = { ss: 0 };

verify.baselineFindAllReferences('1')
