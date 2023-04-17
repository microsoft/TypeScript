/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propD: number;
//// }
//// interface D extends C {
////     [|[|{| "contextRangeIndex": 0 |}propC|]: number;|]
//// }
//// var d: D;
//// d.[|propC|];

verify.baselineRenameAtRangesWithText("propC");
