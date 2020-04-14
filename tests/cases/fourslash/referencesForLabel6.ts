/// <reference path='fourslash.ts'/>

// References to labels with close names

////[|[|{| "contextRangeIndex": 0 |}labela|]: while (true) {
////[|[|{| "contextRangeIndex": 2 |}labelb|]:     while (false) { [|break [|{| "contextRangeIndex": 4 |}labelb|];|] }|]
////            break labelc;
////}|]

verify.singleReferenceGroup("labela", "labela");
verify.singleReferenceGroup("labelb", "labelb");
