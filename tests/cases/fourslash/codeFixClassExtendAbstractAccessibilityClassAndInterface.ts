/// <reference path='fourslash.ts' />

//// function foo() {
////     interface InaccessibleInterface { a: string; }
////     class InaccessibleClass { b: number; }
////     abstract class A {
////         abstract i: InaccessibleInterface;
////         abstract c: InaccessibleClass;
////         abstract n: number;
////     }
////     return A;
//// }
//// class C extends foo() {[| |]}

verify.rangeAfterCodeFix(`
    n: number;
`);
