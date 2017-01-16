/// <reference path='fourslash.ts'/>

////class Foo {
////    "[|blah|]"() { return 0; }
////}
////
////var x: Foo;
////x.[|blah|];

verify.rangesReferenceEachOther();
