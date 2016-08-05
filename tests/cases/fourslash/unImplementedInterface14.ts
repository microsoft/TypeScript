/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1();
////     f2();
//// }
////
////
//// var x: I1 ={[|
////     |]f2() {}
//// }

verify.codeFixAtPosition(`f1(){
    throw new Error('Method not Implemented');
},
`);
