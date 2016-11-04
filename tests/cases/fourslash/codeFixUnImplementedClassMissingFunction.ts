/// <reference path='fourslash.ts' />

//// class A {
////     f() {}
//// }
////
//// class B implements A {[| |]}

verify.rangeAfterCodeFix(`
f(){
    throw new Error('Method not Implemented');
}
`);
