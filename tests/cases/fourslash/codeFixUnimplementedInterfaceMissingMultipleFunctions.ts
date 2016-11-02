/// <reference path='fourslash.ts' />

//// class C1 {
////     f1();
//// }
////
//// class C2 {
////     f2();
//// }
////
//// interface I1 extends C1, C2 {}
////
//// class C3 implements I1 {[|
//// |]}

verify.rangeAfterCodeFix(`f1(){
    throw new Error('Method not Implemented');
}
f2(){
    throw new Error('Method not Implemented');
}
`);