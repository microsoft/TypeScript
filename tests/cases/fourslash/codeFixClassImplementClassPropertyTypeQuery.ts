/// <reference path='fourslash.ts' />

//// class A {
////     A: typeof A;
//// }
//// class D implements A {[| |]}

verify.rangeAfterCodeFix(`
    A: typeof A;
`);
