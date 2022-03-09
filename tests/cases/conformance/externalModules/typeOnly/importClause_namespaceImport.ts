// @Filename: /a.ts
export class A { a!: string }
export class B { b!: number }
export type C<T> = T;
export const Value = {};

// @Filename: /b.ts
import type * as types from './a';
types;
types.Value;
let v: types.Value;
const a: types.A = {};
const b: types.B = {};
const c: types.C<string> = "";
const d = { types };
