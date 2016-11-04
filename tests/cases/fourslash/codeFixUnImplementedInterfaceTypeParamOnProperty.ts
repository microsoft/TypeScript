/// <reference path='fourslash.ts' />

//// interface I {
////     f<T extends number>();
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`f<T extends number>(){
    throw new Error('Method not Implemented');
}
`); 