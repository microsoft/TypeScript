/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract x: this;
//// }
////
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    x: this;
`);
