/// <reference path='fourslash.ts' />

//// interface I {
////     f(x: number, y: this): I
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
f(x: number,y: this): I {
    throw new Error("Method not implemented.");
}
`);
