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
//// *  Commenting [|f|]
//// */
////namespace /*5*/[|f|] {
////    var local = 100;
////}

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
}