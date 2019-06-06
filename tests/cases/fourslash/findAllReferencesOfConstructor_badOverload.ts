/// <reference path="fourslash.ts" />

////class C {
////    [|[|{| "declarationRangeIndex": 0 |}constructor|](n: number);|]
////    [|[|{| "declarationRangeIndex": 2 |}constructor|](){}|]
////}

verify.singleReferenceGroup("class C", "constructor");
