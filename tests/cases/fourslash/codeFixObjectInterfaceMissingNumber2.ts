/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:number;
////     f1();
//// }
////
////
//// var x: I1 ={[|
////     |]f1(){}
//// }

verify.not.codeFixAvailable();
// verify.codeFixAtPosition(`x : 0,
// `);