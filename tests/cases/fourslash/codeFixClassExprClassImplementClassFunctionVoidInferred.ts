/// <reference path='fourslash.ts' />

//// class A {
////     f() {}
//// }
////
//// let B = class implements A {[| |]}

verify.rangeAfterCodeFix(`
f(): void{
    throw new Error("Method not implemented.");
}
`);
