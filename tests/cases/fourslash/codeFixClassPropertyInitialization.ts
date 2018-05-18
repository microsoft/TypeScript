/// <reference path='fourslash.ts' />

// @strict: true

//// abstract class A { abstract a (); }
////
//// class TT { constructor () {} }
////
//// class AT extends A { a () {} }
//// 
//// class Foo {}
////
//// class T {
//// 
////     a: string;
//// 
////     static b: string;
//// 
////     private c: string;
//// 
////     d: number | undefined;
//// 
////     e: string | number;
//// 
////     f: 1;
//// 
////     g: "123" | "456";
//// 
////     h: boolean;
//// 
////     i: TT;
//// 
////     j: A;
//// 
////     k: AT;
//// 
////     l: Foo;
//// }

verify.codeFixAvailable()