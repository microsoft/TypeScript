/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|___bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|___bar|];

verify.rangesReferenceEachOther();
