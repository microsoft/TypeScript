/// <reference path='fourslash.ts'/>

// Valid References for a label

////[|[|{| "declarationRangeIndex": 0 |}label|]: while (true) {
////    if (false) [|break [|{| "declarationRangeIndex": 2 |}label|];|]
////    if (true) [|continue [|{| "declarationRangeIndex": 4 |}label|];|]
////}|]
////
////[|[|{| "declarationRangeIndex": 6 |}label|]: while (false) { }|]
////var label = "label";

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3] = test.ranges();
verify.singleReferenceGroup("label", [r0, r1, r2]);
verify.singleReferenceGroup("label", [r3]);
