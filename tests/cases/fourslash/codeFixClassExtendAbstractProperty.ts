/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract x: number;
////    abstract foo(): number;
//// }
////
//// class C extends A {[|
//// |]}

verify.rangeAfterCodeFix(`
    x: number;
    foo(): number {
        throw new Error('Method not implemented.');
    }
`);
