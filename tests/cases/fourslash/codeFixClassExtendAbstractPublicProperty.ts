/// <reference path='fourslash.ts' />

//// abstract class A {
////    public abstract x: number;
//// }
////
//// class C extends A {[| |]}


verify.rangeAfterCodeFix(`
public x: number;
`);