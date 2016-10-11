/// <reference path='fourslash.ts' />

//// interface I1 {
////     x:string;
////     f1();
//// }
////
//// var x: I1 ={[|
////     |]f1(){}
//// }

verify.codeFixAtPosition(`x : "",
`);
