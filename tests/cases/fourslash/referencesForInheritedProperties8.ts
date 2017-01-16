/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     [|propD|]: number;
//// }
//// interface D extends C {
////     [|propD|]: string;
////     [|propC|]: number;
//// }
//// var d: D;
//// d.[|propD|];
//// d.[|propC|];

const [d0, d1, c0, d2, c1] = test.ranges();
verify.rangesReferenceEachOther([d0, d1, d2]);
verify.rangesReferenceEachOther([c0, c1]);
