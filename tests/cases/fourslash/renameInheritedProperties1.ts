/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|propName|]: string;
//// }
////
//// var v: class1;
//// v.[|propName|];

verify.rangesAreRenameLocations();
