/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propC: number;
//// }
//// interface D extends C {
////     [|propD|]: string;
//// }
//// var d: D;
//// d.[|propD|];

verify.rangesAreRenameLocations();

