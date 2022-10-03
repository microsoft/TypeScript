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

const [Cprop0, Cprop1, Dprop0, Dprop1, prop1Use] = test.ranges();
verify.rangesAreDocumentHighlights([Cprop0]);
verify.rangesAreDocumentHighlights([Dprop0]);
verify.rangesAreDocumentHighlights([Cprop1]);
verify.rangesAreDocumentHighlights([Dprop1, prop1Use]);
