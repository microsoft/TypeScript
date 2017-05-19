/// <reference path='fourslash.ts'/>

////function /*1*/[|f|]() {
////    return 100;
////}
////
////export default /*2*/[|f|];
////
////var x: typeof /*3*/[|f|];
////
////var y = /*4*/[|f|]();
////
/////**
//// *  Commenting [|{| "inComment": true |}f|]
//// */
////namespace /*5*/[|f|] {
////    var local = 100;
////}

const ranges = test.ranges();
verify.renameLocations(ranges.filter(r => !(r.marker && r.marker.data.inComment)), { findInComments: true, ranges });
