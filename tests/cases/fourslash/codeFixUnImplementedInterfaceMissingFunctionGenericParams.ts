/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1<T>(x: number, y: C2);
//// }
////
//// class C2 {}
////
//// class C1 implements I1 {[|
//// |]}

verify.rangeAfterCodeFix(`f1<T>(x: number,y: C2){
    throw new Error('Method not Implemented');
}
`);
