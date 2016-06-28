/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|_bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|_bar|];

verify.rangesReferenceEachOther();
