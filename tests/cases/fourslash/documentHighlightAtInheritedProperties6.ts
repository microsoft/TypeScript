/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class C extends D {
////     [|prop0|]: string;
////     [|prop1|]: string;
//// }
////
//// class D extends C {
////     [|prop0|]: string;
////     [|prop1|]: string;
//// }
////
//// var d: D;
//// d.[|prop1|];

verify.baselineDocumentHighlights();
