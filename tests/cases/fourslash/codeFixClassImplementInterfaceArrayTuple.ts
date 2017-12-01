/// <reference path='fourslash.ts' />

//// interface I {
////     x: number[];
////     y: Array<number>;
////     z: [number, string, I];
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
x: number[];
y: number[];
z: [number, string, I];
`); 