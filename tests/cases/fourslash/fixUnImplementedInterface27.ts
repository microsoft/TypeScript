/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:T;
////     f1();
//// }
////
//// class T {}
////
////
//// var x: I1 ={[|
////     |]f1(){}
//// }

verify.not.codeFixAvailable();
// verify.codeFixAtPosition(`x : null,
// `);