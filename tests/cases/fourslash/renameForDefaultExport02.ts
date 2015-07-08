/// <reference path='fourslash.ts'/>

////export default function /*1*/[|DefaultExportedFunction|]() {
////    return /*2*/[|DefaultExportedFunction|]
////}
/////**
//// *  Commenting [|DefaultExportedFunction|]
//// */
////
////var x: typeof /*3*/[|DefaultExportedFunction|];
////
////var y = /*4*/[|DefaultExportedFunction|]();

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
}