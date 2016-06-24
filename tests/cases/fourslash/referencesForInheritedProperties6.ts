/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
//// class class2 extends class1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
////
//// var v: class2;
//// v.[|propName|];
//// v.[|doStuff|]();

verify.rangesWithSameTextReferenceEachOther();
