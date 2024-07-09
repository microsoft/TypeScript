/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|[|{| "contextRangeIndex": 0 |}doStuff|]() { }|]
//// }
////
//// var v: class1;
//// v.[|doStuff|]();

verify.baselineRenameAtRangesWithText("doStuff");
