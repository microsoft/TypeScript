/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract f1<T extends number>();
//// }
////
//// interface I1 extends C1 {}
////
//// class C2 implements I1 {[|
////
//// |]}

verify.codeFixAtPosition(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}
`);
