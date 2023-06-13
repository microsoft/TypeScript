/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface C extends D {
////     [|prop0|]: string;
////     [|prop1|]: number;
//// }
////
//// interface D extends C {
////     [|prop0|]: string;
////     [|prop1|]: number;
//// }
////
//// var d: D;
//// d.[|prop1|];

verify.baselineDocumentHighlights();
