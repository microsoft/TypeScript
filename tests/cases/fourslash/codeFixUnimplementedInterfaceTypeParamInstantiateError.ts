/// <reference path='fourslash.ts' />

//// interface I<T extends string> {
////    x: T;
//// }
////
//// class C implements I<number> { } 

// Don't know how to instantiate in codeFix
// if instantiation is invalid.
verify.not.codeFixAvailable();