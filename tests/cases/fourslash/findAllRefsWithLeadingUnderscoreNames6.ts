/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    /*1*/public /*2*/__bar;
////    public ___bar;
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x./*3*/__bar;
////x.___bar;
////x.____bar;

verify.baselineFindAllReferences('1', '2', '3');
