/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface interface1 extends interface1 {
////    [|doStuff|](): void;
////    [|propName|]: string;
//// }

verify.baselineDocumentHighlights();
