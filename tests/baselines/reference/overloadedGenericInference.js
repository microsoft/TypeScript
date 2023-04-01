//// [overloadedGenericInference.ts]
// #35501
declare function fn(x: string): string;
declare function fn(x: string[]): string;

declare function map<A, R>(fn: (item: A) => R, list: A[]): R[];

const mapped = map(fn, ['1']);

// #30294 (partial fix)
declare class C {
    static x(y: number): number;
    static x(): number;
}
C.x.call(C, 1); // ok
C.x.call(C); // ok
C.x.call(1); // ok (not an error because the `this` type of `x` is not constrained)


//// [overloadedGenericInference.js]
"use strict";
const mapped = map(fn, ['1']);
C.x.call(C, 1); // ok
C.x.call(C); // ok
C.x.call(1); // ok (not an error because the `this` type of `x` is not constrained)
