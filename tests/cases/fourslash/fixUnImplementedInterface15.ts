/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1();
//// }
////
//// var x: I1 = {[|
////
//// |]}

verify.not.codeFixAvailable();
// verify.codeFixAtPosition(`
// f1(){
//     throw new Error('Method not Implemented');
// }
// `);