/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|__bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|__bar|];

verify.rangesReferenceEachOther();
