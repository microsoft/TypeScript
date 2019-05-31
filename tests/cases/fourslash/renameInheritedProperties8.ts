/// <reference path='fourslash.ts'/>

//// class C implements D {
////     [|[|{| "declarationRangeIndex": 0 |}prop1|]: string;|]
//// }
////
//// interface D extends C {
////     [|[|{| "declarationRangeIndex": 2 |}prop1|]: string;|]
//// }
////
//// var c: C;
//// c.[|prop1|];

verify.rangesAreRenameLocations(test.rangesByText().get("prop1"));
