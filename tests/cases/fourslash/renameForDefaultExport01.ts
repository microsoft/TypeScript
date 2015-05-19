/// <reference path='fourslash.ts'/>

/////**
//// *  Commenting [|DefaultExportedClass|]
//// */
////export default class /*1*/[|DefaultExportedClass|] {
////}
////
////var x: /*2*/[|DefaultExportedClass|];
////
////var y = new /*3*/[|DefaultExportedClass|];
////
////namespace /*4*/[|DefaultExportedClass|] {
////    var local = 100;
////}

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
    verify.renameInfoSucceeded("DefaultExportedClass");
}