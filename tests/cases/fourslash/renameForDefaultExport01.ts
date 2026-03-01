/// <reference path='fourslash.ts'/>

////[|export default class [|{| "contextRangeIndex": 0 |}DefaultExportedClass|] {
////}|]
/////*
//// *  Commenting [|{| "inComment": true |}DefaultExportedClass|]
//// */
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

const ranges = test.rangesByText().get("DefaultExportedClass");
verify.baselineRename(ranges.filter(r => !(r.marker && r.marker.data.inComment)), { findInComments: true });
