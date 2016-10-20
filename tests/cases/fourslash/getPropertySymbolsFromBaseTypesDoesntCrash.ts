/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class ClassA implements IInterface {
////     private /*1*/value: number;
//// }

goTo.marker("1");
verify.documentHighlightsAtPositionCount(1, ["file1.ts"]);