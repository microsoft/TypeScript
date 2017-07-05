/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    public [|__bar|];
////    public ___bar;
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x.[|__bar|];
////x.___bar;
////x.____bar;

verify.rangesReferenceEachOther();
