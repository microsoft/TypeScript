/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:Array<Number>;
//// }
////
//// var x: I1 ={[|
//// |]}

verify.not.codeFixAvailable();
// verify.codeFixAtPosition(`x : null 
// `);