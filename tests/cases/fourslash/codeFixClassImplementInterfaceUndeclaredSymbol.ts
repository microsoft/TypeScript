/// <reference path='fourslash.ts' />

//// interface I {
////    x: T;
//// }
////
//// class C implements I { } 

// T is not a declared symbol. There are a couple fixes:
// 1) Declare T.
// 2) Rename T to an existing symbol.
// 3) Make T a type parameter to I.
//
// In the latter two cases, it is premature to copy `x:T` into C.
// Since we can't guess the programmer's intent here, we do nothing.

verify.codeFixAvailable();
// TODO: (aozgaa) Acknowledge other errors on class/implemented interface/extended abstract class.
// verify.not.codeFixAvailable();