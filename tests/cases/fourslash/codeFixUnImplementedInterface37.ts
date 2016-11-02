/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract f1<T extends number>();
//// }
////
//// abstract class C2 extends C1{
////
//// }
////
//// interface I1 extends C2 {}
////
//// class C3 implements I1 {[|
////
//// |]}

verify.rangeAfterCodeFix(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}
`);
