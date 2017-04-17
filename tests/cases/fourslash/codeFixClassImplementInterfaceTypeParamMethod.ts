/// <reference path='fourslash.ts' />

//// interface I {
////     f<T extends number>(x: T);
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`f<T extends number>(x: T){
    throw new Error("Method not implemented.");
}
`); 