/// <reference path='fourslash.ts'/>

//// class C extends D {
////     [|prop1|]: string;
//// }
////
//// class D extends C {
////     prop1: string;
//// }
////
//// var c: C;
//// c.[|prop1|];

verify.rangesAreRenameLocations();
