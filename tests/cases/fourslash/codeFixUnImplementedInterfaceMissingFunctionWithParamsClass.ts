/// <reference path='fourslash.ts' />

//// interface I1 {
////     f1(x: number, y: T);
//// }
////
//// class T {}
////
//// class C1 implements I1 {[|
//// |]}

verify.rangeAfterCodeFix(`f1(x: number,y: T){
    throw new Error('Method not Implemented');
}
`);
