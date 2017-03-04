/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////     abstract x: keyof T;
////     abstract y: keyof { a:1, b:2 };
//// }
//// class B<U> extends A<U> {[| |]}

verify.rangeAfterCodeFix(`
    x: keyof U;
    y: "a" | "b";
`);