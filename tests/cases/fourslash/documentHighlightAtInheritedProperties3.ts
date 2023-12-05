/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// interface interface1 extends interface1 {
////    [|doStuff|](): void;
////    [|propName|]: string;
//// }
////
//// var v: interface1;
//// v.[|propName|];
//// v.[|doStuff|]();

verify.baselineDocumentHighlights();
