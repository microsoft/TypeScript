/// <reference path='fourslash.ts'/>

////[|export default function /*1*/[|{| "contextRangeIndex": 0 |}DefaultExportedFunction|]() {
////    return /*2*/[|DefaultExportedFunction|]
////}|]
/////**
//// *  Commenting [|{| "inComment": true |}DefaultExportedFunction|]
//// */
////
////var x: typeof /*3*/[|DefaultExportedFunction|];
////
////var y = /*4*/[|DefaultExportedFunction|]();

const ranges = test.rangesByText().get("DefaultExportedFunction");
verify.baselineRename(ranges.filter(r => !(r.marker && r.marker.data.inComment)), { findInComments: true, });
