/// <reference path='fourslash.ts' />

//// abstract class A {
////     abstract get b(): number;
//// }
//// 
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    b: number;
`);