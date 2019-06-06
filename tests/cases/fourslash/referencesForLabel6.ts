/// <reference path='fourslash.ts'/>

// References to labels with close names

////[|[|{| "declarationRangeIndex": 0 |}labela|]: while (true) {
////[|[|{| "declarationRangeIndex": 2 |}labelb|]:     while (false) { [|break [|{| "declarationRangeIndex": 4 |}labelb|];|] }|]
////            break labelc;
////}|]

verify.singleReferenceGroup("labela", "labela");
verify.singleReferenceGroup("labelb", "labelb");
