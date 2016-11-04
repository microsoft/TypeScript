/// <reference path='fourslash.ts' />

//// interface I {
////     f1<T extends number>();
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}
`);