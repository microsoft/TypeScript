/// <reference path='fourslash.ts'/>

////interface interface1 {
////    [|doStuff|](): void;
////}
////
////interface interface2  extends interface1{
////    [|doStuff|](): void;
////}
////
////class class1 implements interface2 {
////    [|doStuff|]() {
////
////    }
////}
////
////class class2 extends class1 {
////
////}
////
////var v: class2;
////v.[|doStuff|]();

verify.rangesWithSameTextReferenceEachOther();
