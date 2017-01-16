/// <reference path='fourslash.ts'/>

////class Foo2 {
////    get "[|42|]"() { return 0; }
////    set [|42|](n) { }
////}
////
////var y: Foo2;
////y[[|42|]];

verify.rangesReferenceEachOther();
