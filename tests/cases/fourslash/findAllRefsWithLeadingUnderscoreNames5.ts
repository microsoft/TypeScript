/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    public __bar;
////    /*1*/public /*2*/___bar;
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x.__bar;
////x./*3*/___bar;
////x.____bar;

verify.baselineFindAllReferences('1', '2', '3');
