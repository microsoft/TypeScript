/// <reference path='fourslash.ts' />

//// interface I {
////     x: { a(b: number, c: string): number };
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    a: { (b: number, c: string): number; };
`);

