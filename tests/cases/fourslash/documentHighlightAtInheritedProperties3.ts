/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }
////
//// var v: interface1;
//// v./*3*/propName;
//// v./*4*/doStuff();

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(2, ["file1.ts"]);
}
