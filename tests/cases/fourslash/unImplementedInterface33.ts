/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract f1<T extends number>();
//// }
////
//// abstract class C2 extends C1 {
////
//// }
////
//// class C3 implements C2 {[|
////     |]f2(){}
//// }

verify.codeFixAtPosition(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}
`);
