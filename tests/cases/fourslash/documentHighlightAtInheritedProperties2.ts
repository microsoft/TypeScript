/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(1, ["file1.ts"]);
}