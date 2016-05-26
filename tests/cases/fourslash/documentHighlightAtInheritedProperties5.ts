/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface C extends D {
////     /*0*/prop0: string;
////     /*1*/prop1: number;
//// }
//// 
//// interface D extends C {
////     /*2*/prop0: string;
////     /*3*/prop1: number;
//// }
//// 
//// var d: D;
//// d./*4*/prop1;

goTo.marker("0");
verify.documentHighlightsAtPositionCount(2, ["file1.ts"]);

goTo.marker("1");
verify.documentHighlightsAtPositionCount(3, ["file1.ts"]);

goTo.marker("2");
verify.documentHighlightsAtPositionCount(2, ["file1.ts"]);

goTo.marker("3");
verify.documentHighlightsAtPositionCount(3, ["file1.ts"]);

goTo.marker("4");
verify.documentHighlightsAtPositionCount(3, ["file1.ts"]);