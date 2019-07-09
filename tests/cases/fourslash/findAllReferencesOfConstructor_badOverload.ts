/// <reference path="fourslash.ts" />

////class C {
////    [|[|{| "contextRangeIndex": 0 |}constructor|](n: number);|]
////    [|[|{| "contextRangeIndex": 2 |}constructor|](){}|]
////}

verify.singleReferenceGroup("class C", "constructor");
