/// <reference path='fourslash.ts'/>

// References to a label outside function bounderies

////[|[|{| "contextRangeIndex": 0 |}label|]: function foo(label) {
////    while (true) {
////        [|break [|{| "contextRangeIndex": 2 |}label|];|]
////    }
////}|]

verify.singleReferenceGroup("label", "label");
