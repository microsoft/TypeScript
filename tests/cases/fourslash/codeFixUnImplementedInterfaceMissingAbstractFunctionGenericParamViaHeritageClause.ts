/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract f1<T>();
//// }
////
//// abstract class C2 extends C1 {
////
//// }
////
//// class C3 implements C2 {[|
////     |]f2(){}
//// }

verify.rangeAfterCodeFix(`f1<T>(){
    throw new Error('Method not Implemented');
}
`);
