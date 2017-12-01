/// <reference path='fourslash.ts' />

//// class A {
////     f() {}
//// }
////
//// class B implements A {[| |]}

verify.rangeAfterCodeFix(`
f(): void{
    throw new Error("Method not implemented.");
}
`);
