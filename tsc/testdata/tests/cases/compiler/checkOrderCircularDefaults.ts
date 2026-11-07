// @strict: true
// @declaration: true
// @checkOrder: default, reverse, isolated, typesfirst

// Which type parameter of a cycle of defaults is circular must not depend
// on which default is resolved first.

// @filename: a.ts
import type { B } from "./b";
export interface A<T = B> { a: T }
export declare const a: A;

// @filename: b.ts
import type { A } from "./a";
export interface B<U = A> { b: U }
export declare const b: B;
