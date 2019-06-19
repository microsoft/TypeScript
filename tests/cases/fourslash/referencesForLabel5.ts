/// <reference path='fourslash.ts'/>

// References to shadowed label

////[|[|{| "contextRangeIndex": 0 |}label|]:  while (true) {
////            if (false) [|break [|{| "contextRangeIndex": 2 |}label|];|]
////            function blah() {
////[|[|{| "contextRangeIndex": 4 |}label|]:          while (true) {
////                    if (false) [|break [|{| "contextRangeIndex": 6 |}label|];|]
////                }|]
////            }
////            if (false) [|break [|{| "contextRangeIndex": 8 |}label|];|]
////        }|]

const [ourter1Def, outer1, outer2Def, outer2, inner1Def, inner1, inner2Def, inner2, outer3Def, outer3] = test.ranges();
verify.singleReferenceGroup("label", [outer1, outer2, outer3]);
verify.singleReferenceGroup("label", [inner1, inner2]);
