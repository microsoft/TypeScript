/// <reference path='fourslash.ts'/>

////export default class /*1*/[|DefaultExportedClass|] {
////}
/////*
//// *  Commenting [|DefaultExportedClass|]
//// */
////
////var x: /*2*/[|DefaultExportedClass|];
////
////var y = new /*3*/[|DefaultExportedClass|];

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
}