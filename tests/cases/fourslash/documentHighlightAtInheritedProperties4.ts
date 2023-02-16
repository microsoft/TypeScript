/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class class1 extends class1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
////
//// var c: class1;
//// c.[|doStuff|]();
//// c.[|propName|];

verify.baselineDocumentHighlights();
