/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:number;
//// }
////
//// var x: I1 ={[|
//// |]}

verify.codeFixAtPosition(`x : 0 
`);
