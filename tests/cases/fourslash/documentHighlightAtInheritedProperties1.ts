/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(1, ["file1.ts"]);
}
