/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1()
//// }
////
//// interface I2 extends I1 {
////
//// }
////
//// class C1 implements I2 {[|
//// |]}

verify.rangeAfterCodeFix(`f1(){
    throw new Error('Method not Implemented');
}
`);
