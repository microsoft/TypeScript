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

// interface I {
//     x: string;
//     y: number;
//     z: Readonly<I>;
// }

// class C implements I { }

// type T =  { 1: number, 2: string, 3: T };
// type TKeys = keyof T;
// type ShiftT = { [K in TKeys]: T[K + 1] };

abstract class A<T> {
    abstract a: { ["a"]: number };
    abstract x: { [K in keyof T]?: T[K] };
    abstract y: { [K in keyof {}]?: T[K] };
}