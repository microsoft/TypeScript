/// <reference path='fourslash.ts' />

//// function foo() {
////     interface Inaccessible {
////         q: string
////     }
////     abstract class C {
////         abstract x: number & Inaccessible & string;
////         abstract y: number | Inaccessible | string;
////         abstract n: number & {};
////     }
////     return C;
//// }
//// class C extends foo() {[| |]}

verify.rangeAfterCodeFix(`
    n: number & {};
`);
