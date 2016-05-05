/// <reference path='fourslash.ts'/>

////var x = function /*1*/[|f|](g: any, h: any) {
////    /*2*/[|f|](/*3*/[|f|], g);
////}

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);

    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}