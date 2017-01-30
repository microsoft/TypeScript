/// <reference path='fourslash.ts' />

//// interface I {
////     f(x: number, y: string): I
//// }
////
//// class C implements I {[|
//// |]}

verify.rangeAfterCodeFix(`
f(x: number,y: string): I {
    throw new Error('Method not implemented.');
}
`);
