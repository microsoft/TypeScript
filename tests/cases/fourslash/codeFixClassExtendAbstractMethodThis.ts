/// <reference path='fourslash.ts' />

//// abstract class A {
////    abstract f(): this;
//// }
////
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    f(): this {
        throw new Error("Method not implemented.");
    }
`);
