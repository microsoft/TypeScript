/// <reference path='fourslash.ts' />

//// interface I {
////     a1: { new (b1: number, c1: string): number; };
////     a2: new (b2: number, c2: string) => number;
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    a1: new (b1: number, c1: string) => number;
    a2: new (b2: number, c2: string) => number;
`);
