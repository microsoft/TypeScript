/// <reference path='fourslash.ts'/>

////class Foo {
////    public /*1*/12: any;
////}
////
////var x: Foo;
////x[12];
////x = { "12": 0 };
////x = { 12: 0 };

verify.baselineFindAllReferences('1')
