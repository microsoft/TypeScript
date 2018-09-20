/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propD: number;
//// }
//// interface D extends C {
////     [|propC|]: number;
//// }
//// var d: D;
//// d.[|propC|];

verify.rangesAreRenameLocations();
