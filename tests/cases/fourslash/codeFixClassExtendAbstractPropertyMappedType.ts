/// <reference path='fourslash.ts' />

//// abstract class A<T> {
////     abstract x: { [K in keyof T]?: T[K] };
////     abstract y: { [K in keyof {}]?: T[K] };
////     abstract z: { [K in keyof { a: 1 }]?: T[K] };
//// }
//// class B<U> extends A<U> {[| |]}

verify.rangeAfterCodeFix(`
    x: { [K in keyof U]?: U[K]; };
    y: {};
    z: { a?: U["a"]; };
`);
