/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     f1(){}
//// }
////
//// class C2 implements C1 {[|
////     |]f2(){}
//// }

verify.codeFixAtPosition(`f1(){
    throw new Error('Method not Implemented');
}
`);
