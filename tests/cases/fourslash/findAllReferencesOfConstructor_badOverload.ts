/// <reference path="fourslash.ts" />

////class C {
////    [|[|{| "contextRangeIndex": 0, "isDefinition": true |}constructor|](n: number);|]
////    [|[|{| "contextRangeIndex": 2, "isDefinition": true |}constructor|](){}|]
////}

verify.singleReferenceGroup("class C", "constructor");
