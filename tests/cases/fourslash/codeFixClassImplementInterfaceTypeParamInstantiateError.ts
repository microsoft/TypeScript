/// <reference path='fourslash.ts' />

//// interface I<T extends string> {
////    x: T;
//// }
////
//// class C implements I<number> { } 

verify.codeFixAvailable();

// TODO: (arozga) Don't know how to instantiate in codeFix
// if instantiation is invalid.
// verify.not.codeFixAvailable();