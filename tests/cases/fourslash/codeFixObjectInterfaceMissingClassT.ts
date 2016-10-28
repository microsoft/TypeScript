/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:T;
//// }
////
//// class T {}
////
//// var x: I1 ={[|
//// |]}

verify.not.codeFixAvailable();
// verify.codeFixAtPosition(`x : null 
// `);