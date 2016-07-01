/// <reference path='fourslash.ts'/>

////interface I {
////    [[|42|]](): void;
////}
////
////class C implements I {
////    [[|42|]]: any;
////}
////
////var x: I = {
////    ["[|42|]"]: function () { }
////}

verify.rangesReferenceEachOther();
