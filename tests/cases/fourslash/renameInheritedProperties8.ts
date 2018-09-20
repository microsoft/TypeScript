/// <reference path='fourslash.ts'/>

//// class C implements D {
////     [|prop1|]: string;
//// }
////
//// interface D extends C {
////     [|prop1|]: string;
//// }
////
//// var c: C;
//// c.[|prop1|];

verify.rangesAreRenameLocations();
