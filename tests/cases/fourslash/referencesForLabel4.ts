/// <reference path='fourslash.ts'/>

// References to a label outside function bounderies

////[|[|{| "declarationRangeIndex": 0 |}label|]: function foo(label) {
////    while (true) {
////        [|break [|{| "declarationRangeIndex": 2 |}label|];|]
////    }
////}|]

verify.singleReferenceGroup("label", "label");
