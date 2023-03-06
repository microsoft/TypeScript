// @skipLibCheck: true
/// <reference path="/.lib/react16.d.ts" />

type Stuff<T> =
    T extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[T]
        : any;

function F<T, U>(p1: Stuff<T>, p2: Stuff<U>) {
    p1 = p2; // Error
}