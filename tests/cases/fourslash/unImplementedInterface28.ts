/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1();
//// }
////
//// interface I2 {
////     f2();
//// }
////
//// var x: I1|I2 ={[|
////
//// |]}

verify.codeFixAtPosition(`f1(){
    throw new Error('Method not Implemented');
}
f2(){
    throw new Error('Method not Implemented');
}
`);
