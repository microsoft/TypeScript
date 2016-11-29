/// <reference path='fourslash.ts' />

//// interface I {
////     f1();
//// }
////
//// class C implements I {[|
//// |]}

verify.rangeAfterCodeFix(`f1(){
    throw new Error('Method not implemented.');
}
`);
