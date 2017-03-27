/// <reference path='fourslash.ts' />

//// abstract class A {
////    protected abstract x: number;
//// }
////
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
protected x: number;
`);
