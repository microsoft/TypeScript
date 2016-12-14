/// <reference path='fourslash.ts' />

//// abstract class A {
////     abstract set c(arg: number | string);
//// }
//// 
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    c: string | number;
`);