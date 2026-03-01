/// <reference path='fourslash.ts'/>

//// class C implements D {
////     [|[|{| "contextRangeIndex": 0 |}prop1|]: string;|]
//// }
////
//// interface D extends C {
////     [|[|{| "contextRangeIndex": 2 |}prop1|]: string;|]
//// }
////
//// var c: C;
//// c.[|prop1|];

verify.baselineRenameAtRangesWithText("prop1");
