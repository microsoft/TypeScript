/// <reference path='fourslash.ts' />

//// interface I {
////     a1: { (b1: number, c1: string): number; };
////     a2: (b2: number, c2: string) => number;
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    a1: (b1: number, c1: string) => number;
    a2: (b2: number, c2: string) => number;
`);

