/// <reference path='fourslash.ts'/>

////[|function /*1*/[|{| "contextRangeIndex": 0 |}f|]() {
////    return 100;
////}|]
////
////[|export default /*2*/[|{| "contextRangeIndex": 2 |}f|];|]
////
////var x: typeof /*3*/[|f|];
////
////var y = /*4*/[|f|]();
////
/////**
//// *  Commenting [|{| "inComment": true |}f|]
//// */
////[|namespace /*5*/[|{| "contextRangeIndex": 7 |}f|] {
////    var local = 100;
////}|]

const ranges = test.rangesByText().get("f");
verify.baselineRename(ranges.filter(r => !(r.marker && r.marker.data.inComment)), { findInComments: true, });
