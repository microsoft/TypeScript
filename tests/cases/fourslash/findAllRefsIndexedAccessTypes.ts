/// <reference path='fourslash.ts' />

////interface I {
////    [|{| "isDefinition": true |}0|]: number;
////    [|{| "isDefinition": true |}s|]: string;
////}
////interface J {
////    a: I[[|0|]],
////    b: I["[|s|]"],
////}

const [n0, s0, n1, s1] = test.ranges();
verify.singleReferenceGroup("(property) I[0]: number", [n0, n1]);
verify.singleReferenceGroup("(property) I.s: string", [s0, s1]);
