//// [tests/cases/compiler/checkOrderCircularDefaults.ts] ////

//// [a.ts]
import type { B } from "./b";
export interface A<T = B> { a: T }
export declare const a: A;

//// [b.ts]
import type { A } from "./a";
export interface B<U = A> { b: U }
export declare const b: B;


//// [b.js]
export {};
//// [a.js]
export {};


//// [b.d.ts]
import type { A } from "./a";
export interface B<U = A> {
    b: U;
}
export declare const b: B;
//// [a.d.ts]
import type { B } from "./b";
export interface A<T = B> {
    a: T;
}
export declare const a: A;
