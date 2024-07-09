/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class ClassA implements IInterface {
////     private [|value|]: number;
//// }

verify.baselineDocumentHighlights();
