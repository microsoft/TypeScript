/// <reference path='fourslash.ts'/>

// References to unused label

////[|[|{| "declarationRangeIndex": 0 |}label|]: while (true) {
////    var label = "label";
////}|]

verify.singleReferenceGroup("label", "label");
