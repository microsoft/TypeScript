/// <reference path='fourslash.ts' />

//// namespace N {
////     export interface I {
////         y: I;
////     }
//// }
//// class C1 implements N.I {[| |]}

verify.rangeAfterCodeFix(`
y: N.I;
`);