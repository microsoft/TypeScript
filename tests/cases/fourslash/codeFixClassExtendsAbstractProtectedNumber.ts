/// <reference path='fourslash.ts' />

//// abstract class A {
////    protected abstract x: number;
//// }
////
//// class C extends A {[|
//// |]}

verify.codeFixAtPosition(`
protected abstract x: number;
`);
