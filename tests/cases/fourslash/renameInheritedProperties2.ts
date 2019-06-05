/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|[|{| "declarationRangeIndex": 0 |}doStuff|]() { }|]
//// }
////
//// var v: class1;
//// v.[|doStuff|]();

verify.rangesWithSameTextAreRenameLocations("doStuff");
