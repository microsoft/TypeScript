/// <reference path='fourslash.ts'/>

/////**
//// *  Commenting [|DefaultExportedFunction|]
//// */
////export default function /*1*/[|DefaultExportedFunction|]() {
////    return /*2*/[|DefaultExportedFunction|]
////}
////
////var x: typeof /*3*/[|DefaultExportedFunction|];
////
////var y = /*4*/[|DefaultExportedFunction|]();
////
////namespace /*5*/[|DefaultExportedFunction|] {
////    var local = 100;
////}

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
    verify.renameInfoSucceeded("DefaultExportedFunction");
}