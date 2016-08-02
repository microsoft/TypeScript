/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:boolean;
////     f1();
//// }
////
////
//// var x: I1 ={[|
////     |]f1(){}
//// }

verify.codeFixAtPosition(`x : false,
`);
