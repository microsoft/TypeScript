/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }
////
//// var c: class1;
//// c./*3*/doStuff();
//// c./*4*/propName;

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(2, ["file1.ts"]);
}
