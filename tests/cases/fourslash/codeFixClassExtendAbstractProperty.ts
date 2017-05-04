/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract x: number;
////    abstract y: this;
////    abstract z: A;
//// }
////
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    x: number;
    y: this;
    z: A;
`);
