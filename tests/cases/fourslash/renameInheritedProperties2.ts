/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|doStuff|]() { }
//// }
////
//// var v: class1;
//// v.[|doStuff|]();

verify.rangesAreRenameLocations();
