/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|____bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|____bar|];

verify.rangesReferenceEachOther();
