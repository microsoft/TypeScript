/// <reference path='fourslash.ts' />

//// interface I {
////     a0: {};
////     a1: { (b1: number, c1: string): number; };
////     a2: (b2: number, c2: string) => number;
////     a3: { (b3: number, c3: string): number, x: number };
//// 
////     a4: { new (b1: number, c1: string): number; };
////     a5: new (b2: number, c2: string) => number;
////     a6: { new (b3: number, c3: string): number, x: number };
//// 
////     a7: { foo(b7: number, c7: string): number };
////     
////     a8: { (b81: number, c81: string): number, new (b82: number, c82: string): number; };
//// 
////     a9: { (b9: number, c9: string): number; [d9: number]: I };
////     a10: { (b10: number, c10: string): number; [d10: string]: I };
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    a0: {};
    a1: (b1: number, c1: string) => number;
    a2: (b2: number, c2: string) => number;
    a3: { (b3: number, c3: string): number; x: number; };
    a4: new (b1: number, c1: string) => number;
    a5: new (b2: number, c2: string) => number;
    a6: { new (b3: number, c3: string): number; x: number; };
    a7: { foo(b7: number, c7: string): number; };
    a8: { (b81: number, c81: string): number; new (b82: number, c82: string): number; };
    a9: { (b9: number, c9: string): number; [d9: number]: I; };
    a10: { (b10: number, c10: string): number; [d10: string]: I; };
`);