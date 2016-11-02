/// <reference path='fourslash.ts' />

//// interface I1 {
////
//// }
////
//// interface I2 {
////     f1();
//// }
////
//// interface I3 extends I2, I1 {}
////
//// class C1 implements I3 {[|
//// |]}

verify.rangeAfterCodeFix(`f1(){
    throw new Error('Method not Implemented');
}
`);
