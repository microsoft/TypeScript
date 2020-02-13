// @Filename: /a.ts
export class A<T> { a!: T }
export type { A as B };

// @Filename: /b.ts
import type { A } from './a';
import { B } from './a';
let a: A<string> = { a: "" };
let b: B<number> = { a: 3 };
let c: A<boolean> = {};
let d: B = { a: "" };