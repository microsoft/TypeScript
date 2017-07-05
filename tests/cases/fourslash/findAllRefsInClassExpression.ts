/// <reference path='fourslash.ts'/>

////interface I { [|boom|](): void; }
////new class C implements I {
////   [|boom|](){}
////}

verify.rangesReferenceEachOther();
