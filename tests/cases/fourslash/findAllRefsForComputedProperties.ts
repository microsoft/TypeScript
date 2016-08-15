/// <reference path='fourslash.ts'/>


////interface I {
////    ["[|prop1|]"]: () => void;
////}
////
////class C implements I {
////    ["[|prop1|]"]: any;
////}
////
////var x: I = {
////    ["[|prop1|]"]: function () { },
////}

verify.rangesReferenceEachOther();
