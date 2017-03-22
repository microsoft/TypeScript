/// <reference path='fourslash.ts' />

// @lib: es2017

//// enum E { a,b,c }
//// interface I {
////     a: E.a
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    a: E.a;
`);