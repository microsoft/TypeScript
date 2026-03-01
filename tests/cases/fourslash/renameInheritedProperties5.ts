/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propC: number;
//// }
//// interface D extends C {
////     [|[|{| "contextRangeIndex": 0 |}propD|]: string;|]
//// }
//// var d: D;
//// d.[|propD|];

verify.baselineRenameAtRangesWithText("propD");

