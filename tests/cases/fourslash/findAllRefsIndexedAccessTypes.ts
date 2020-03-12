/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}0|]: number;|]
////    [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}s|]: string;|]
////}
////interface J {
////    a: I[[|0|]],
////    b: I["[|s|]"],
////}

verify.singleReferenceGroup("(property) I[0]: number", "0");
verify.singleReferenceGroup("(property) I.s: string", "s");
