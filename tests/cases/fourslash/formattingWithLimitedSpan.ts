/// <reference path="fourslash.ts" />

////if (true)
////{
/////*1*/debugger;/*end1*/
////if (true)
/////*2*/debugger;/*end2*/
////if (true) {
/////*3*/debugger;/*end3*/
////}
////}


for (var i = 1; i < 4; i++) {
    var markerString = i.toString();
    goTo.marker(markerString);
    format.selection(markerString, "end" + markerString);
    verify.currentLineContentIs("    debugger;");
}