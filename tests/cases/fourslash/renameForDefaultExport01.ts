/// <reference path='fourslash.ts'/>

////export default class [|DefaultExportedClass|] {
////}
/////*
//// *  Commenting [|{| "inComment": true |}DefaultExportedClass|]
//// */
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

const ranges = test.ranges();
verify.renameLocations(ranges.filter(r => !(r.marker && r.marker.data.inComment)), { findInComments: true, ranges });
